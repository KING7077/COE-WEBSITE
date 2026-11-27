"""Build public/data/timetables.js from the CO timetable spreadsheets.

Usage (from the repository root):
    python scripts/build_timetables.py

Each workbook becomes one term. Every semester sheet becomes a semester with
its course list; the "Department Electives" sheet becomes the term's elective
list. Slot strings are turned into grid placements that time_tables.html
renders onto the IITH slot grid.

To add a new term, append an entry to TERMS below and re-run the script.
"""

import json
import re
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "data" / "timetables.js"

TERMS = [
    {
        "id": "2026-jul",
        "label": "July – November 2026",
        "short": "Jul–Nov 2026",
        "file": "CO_Timetable_JulyNov2026.xlsx",
        "calendar": "./assets/files/IITH-Academic-Calendar-Jul-Nov-2026.pdf",
        # (month, day) window in which this term is the default selection
        "startMonth": 6,
        "endMonth": 11,
    },
    {
        "id": "2027-jan",
        "label": "January – April 2027",
        "short": "Jan–Apr 2027",
        "file": "CO_Timetable_JanApril2027.xlsx",
        "calendar": None,
        "startMonth": 12,
        "endMonth": 5,
    },
]

# Spelling fixes applied to names coming from the sheets.
FIXES = {
    "Enggineering": "Engineering",
    "Hypersoinc": "Hypersonic",
    "Maunednra": "Maunendra",
    "Enterprenuership": "Entrepreneurship",
    "Parrallel": "Parallel",
    "Ghasias": "Ghaisas",
    "Kishalaya Mitra": "Kishalay Mitra",
    "Semiconductors Materials": "Semiconductor Materials",
    "Intro to Hardware": "Introduction to Hardware",
    "Introduction to Engg. Materials": "Introduction to Engineering Materials",
    "Introduction to parallel scientific computing": "Introduction to Parallel Scientific Computing",
    "Mesoscale modeling": "Mesoscale Modeling",
    "Operating Systems - 2 lab": "Operating Systems II Lab",
    "Operating Systems - 2": "Operating Systems II",
    "Introduction to Programming Theory": "Introduction to Programming (Theory)",
    "Introduction to Programming Lab": "Introduction to Programming (Lab)",
    "Methods - I": "Methods I",
    "Methods - II": "Methods II",
    "Techniques - I": "Techniques I",
    "LA/CA elective": "LA/CA Elective",
    "Saswata & Anuj": "Saswata Bhattacharya, Anuj Goyal",
    "Saswata Bhattacharya and Anuj Goyal": "Saswata Bhattacharya, Anuj Goyal",
}


def clean(value):
    if value is None:
        return ""
    text = str(value).strip()
    text = re.sub(r"\s+", " ", text)
    for wrong, right in FIXES.items():
        text = text.replace(wrong, right)
    return text


def credits_of(value):
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return int(value) if float(value).is_integer() else float(value)
    text = clean(value)
    match = re.match(r"^(\d+(?:\.\d+)?)\s*(.*)$", text)
    if not match:
        return text
    number = float(match.group(1))
    number = int(number) if number.is_integer() else number
    rest = match.group(2).strip()
    return number if not rest else {"value": number, "note": rest.strip("() ")}


def segment_of(value):
    if value is None or value == "":
        return ""
    if isinstance(value, float):
        value = int(value)
    return str(value).strip()


def placements(slot, segment):
    """Turn a sheet's slot text into grid placements."""
    slot = clean(slot)
    if not slot:
        return []
    if "Wed" in slot or slot.upper().startswith("X"):
        return [{"an": "Wed", "seg": segment}]
    an_match = re.fullmatch(r"AN(\d)", slot.upper())
    if an_match:
        day = ["Mon", "Tue", "Wed", "Thu", "Fri"][int(an_match.group(1)) - 1]
        return [{"an": day, "seg": segment}]
    multi = re.findall(r"([A-GP-SW-Z])\s*\((\d+)\)", slot)
    if multi:
        return [{"slot": letter, "seg": seg} for letter, seg in multi]
    if re.fullmatch(r"[A-GP-SW-Z]", slot):
        return [{"slot": slot, "seg": segment or "16"}]
    return []


def header_index(row):
    return {clean(v).lower(): i for i, v in enumerate(row) if v is not None}


def read_semester(ws):
    match = re.search(r"Sem\s*(\d)", ws.title)
    batch = re.search(r"Batch\s*(\d+)", ws.title)
    sem = {
        "id": f"sem{match.group(1)}",
        "number": int(match.group(1)),
        "batch": f"20{batch.group(1)}" if batch else "",
        "courses": [],
        "basket": None,
    }
    cols = None
    target = sem["courses"]
    for row in ws.iter_rows(values_only=True):
        if not any(v is not None and str(v).strip() for v in row):
            continue
        first = clean(row[0])
        if first.lower() == "course code":
            cols = header_index(row)
            continue
        if row[1] is None and "basket" in first.lower():
            title, _, note = first.partition("(")
            sem["basket"] = {
                "title": title.strip(),
                "note": note.rstrip(")").strip(),
                "courses": [],
            }
            target = sem["basket"]["courses"]
            continue
        if cols is None:
            continue

        def get(name):
            i = cols.get(name)
            return row[i] if i is not None and i < len(row) else None

        slot = get("slot")
        seg = segment_of(get("segment"))
        course = {
            "code": clean(get("course code")),
            "name": clean(get("name")),
            "credits": credits_of(get("credits")),
            "slot": clean(slot),
            "seg": seg,
            "room": clean(get("classroom")),
            "instructor": clean(get("instructor")),
            "place": placements(slot, seg),
        }
        # Rows such as "CO xxxx", "LAxxxx", "FE" or a blank code are credit
        # placeholders for a basket, not real courses.
        if not course["code"] or "xxxx" in course["code"].lower() or course["code"] in {"CO", "FE", "LA"}:
            course["code"] = ""
            course["placeholder"] = True
        if get("semester"):
            course["term"] = clean(get("semester"))
        # A lab row listed under the same code as its theory row is one course;
        # its credits are already counted on the theory row.
        if target and course["code"] and target[-1]["code"] == course["code"]:
            course["credits"] = 0
            course["partOf"] = course["code"]
        target.append(course)
    return sem


def read_electives(ws):
    groups = [{"title": "Department Electives", "courses": []}]
    cols = None
    for row in ws.iter_rows(values_only=True):
        if not any(v is not None and str(v).strip() for v in row):
            continue
        first = clean(row[0])
        if first.lower() == "course code":
            cols = header_index(row)
            continue
        if row[1] is None:
            groups.append({"title": first, "courses": []})
            continue

        def get(name):
            i = cols.get(name)
            return row[i] if i is not None and i < len(row) else None

        name = clean(get("name"))
        prereq = ""
        m = re.search(r"\((?:Pre-?requisite:?)\s*([^)]*)\)", name, re.I)
        if m:
            prereq = m.group(1).strip()
            name = name[: m.start()].strip()
        course = {
            "code": clean(get("course code")),
            "name": name,
            "credits": credits_of(get("credits")),
            "slot": clean(get("slot")),
            "instructor": clean(get("instructor")),
        }
        if prereq:
            course["prereq"] = prereq
        kind = clean(get("type"))
        if kind:
            course["type"] = "hpc" if "hpc" in kind.lower() else "de"
        groups[-1]["courses"].append(course)
    return [g for g in groups if g["courses"]]


def build():
    terms = []
    for term in TERMS:
        wb = openpyxl.load_workbook(ROOT / term["file"], data_only=True)
        semesters, electives = [], []
        for ws in wb.worksheets:
            if re.search(r"Sem\s*\d", ws.title):
                semesters.append(read_semester(ws))
            elif "elective" in ws.title.lower():
                electives = read_electives(ws)
        semesters.sort(key=lambda s: s["number"])
        out = {k: v for k, v in term.items() if k != "file"}
        out["source"] = term["file"]
        out["semesters"] = semesters
        out["electives"] = electives
        terms.append(out)

    data = {
        "days": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "grid": [
            {"time": "09:00", "end": "09:55", "Mon": "A", "Tue": "D", "Wed": "B", "Thu": "C", "Fri": "E"},
            {"time": "10:00", "end": "10:55", "Mon": "B", "Tue": "E", "Wed": "C", "Thu": "A", "Fri": "F"},
            {"time": "11:00", "end": "11:55", "Mon": "C", "Tue": "F", "Wed": "A", "Thu": "B", "Fri": "D"},
            {"time": "12:00", "end": "12:55", "Mon": "D", "Tue": "G", "Wed": "G", "Thu": "E", "Fri": "G"},
            {"time": "12:55", "end": "14:30", "lunch": True},
            {"time": "14:30", "end": "15:55", "Mon": "P", "Tue": "R", "Wed": "AN", "Thu": "Q", "Fri": "S", "an": 1},
            {"time": "16:00", "end": "17:25", "Mon": "Q", "Tue": "S", "Wed": "AN", "Thu": "P", "Fri": "R", "an": 2},
            {"time": "17:30", "end": "19:00", "Mon": "W", "Tue": "Y", "Wed": "", "Thu": "W", "Fri": "Y"},
            {"time": "19:00", "end": "20:30", "Mon": "X", "Tue": "Z", "Wed": "", "Thu": "X", "Fri": "Z"},
        ],
        "terms": terms,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(data, indent=2, ensure_ascii=False)
    OUT.write_text(
        "// Generated by scripts/build_timetables.py from the CO timetable spreadsheets.\n"
        "// Do not edit by hand; edit the spreadsheets and re-run the script.\n"
        f"window.TIMETABLES = {body};\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
