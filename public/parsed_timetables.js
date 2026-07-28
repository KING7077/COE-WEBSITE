const TIMETABLES_DATA = {
  "semesters": [
    { "id": "sem1", "label": "Sem-1 (Batch 2026)" },
    { "id": "sem3", "label": "Sem-3 (Batch 2025)" },
    { "id": "sem5", "label": "Sem-5 (Batch 2024)" },
    { "id": "sem7", "label": "Sem-7 (Batch 2023)" }
  ],
  "SLOT_DATA": {
    "sem1": {
      "A": {
        "s12": { "code": "MA1110", "name": "Calculus I", "room": "LHC-13" },
        "s34": { "code": "MA1220", "name": "Calculus II", "room": "LHC-5" },
        "s56": { "code": "BT1010", "name": "Intro to Life Sciences", "room": "LHC-5" }
      },
      "B": {
        "s12": null,
        "s34": { "code": "EP1108", "name": "Modern Physics", "room": "LHC-5" },
        "s56": { "code": "EP1108", "name": "Modern Physics", "room": "LHC-5" }
      },
      "C": {
        "s12": { "code": "EE1202", "name": "Digital Circuits", "room": "LHC-12" },
        "s34": { "code": "EE1202", "name": "Digital Circuits", "room": "LHC-12" },
        "s56": { "code": "EE1202", "name": "Digital Circuits", "room": "LHC-12" }
      },
      "E": {
        "s12": { "code": "MS1980", "name": "Fund. of Scientific Computing", "room": "LHC-1", "instructor": "Saswata Bhattacharya, Anuj Goyal" },
        "s34": { "code": "MS1980", "name": "Fund. of Scientific Computing", "room": "LHC-1", "instructor": "Saswata Bhattacharya, Anuj Goyal" },
        "s56": null
      },
      "F": {
        "s12": { "code": "ID1063", "name": "Intro to Programming (Theory)", "room": "LHC-5", "instructor": "Rakesh Venkat" },
        "s34": { "code": "ID1063", "name": "Intro to Programming (Theory)", "room": "LHC-5", "instructor": "Rakesh Venkat" },
        "s56": { "code": "ID1063", "name": "Intro to Programming (Theory)", "room": "LHC-5", "instructor": "Rakesh Venkat" }
      },
      "Q": {
        "s12": { "code": "CY1010", "name": "Environmental Chemistry", "room": "LHC-5" },
        "s34": { "code": "CY1010", "name": "Environmental Chemistry", "room": "LHC-5" },
        "s56": null
      }
    },
    "sem3": {
      "C": {
        "s12": { "code": "BT1020", "name": "Basic Bioinformatics", "room": "LHC-3" },
        "s34": { "code": "BT1020", "name": "Basic Bioinformatics", "room": "LHC-3" },
        "s56": null
      },
      "Q": {
        "s12": { "code": "ME2110", "name": "Mechanics of Solids", "room": "LHC-8" },
        "s34": { "code": "ME2110", "name": "Mechanics of Solids", "room": "LHC-8" },
        "s56": { "code": "CS3510", "name": "Operating Systems I", "room": "LHC-4", "instructor": "Bheemarjuna Reddy Tamma, CSR Murty" }
      },
      "D": {
        "s12": { "code": "MA2110", "name": "Probability", "room": "LHC-4" },
        "s34": { "code": "MA2120", "name": "Transform Techniques", "room": "LHC-4" },
        "s56": { "code": "ME2110", "name": "Mechanics of Solids", "room": "LHC-8" }
      },
      "P": {
        "s12": { "code": "ID2230", "name": "Data Structures & Applications", "room": "LHC-5", "instructor": "Subrahmanyam Kalyanasundaram, Maunendra Desarkar" },
        "s34": { "code": "ID2230", "name": "Data Structures & Applications", "room": "LHC-5", "instructor": "Subrahmanyam Kalyanasundaram, Maunendra Desarkar" },
        "s56": { "code": "ID2230", "name": "Data Structures & Applications", "room": "LHC-5", "instructor": "Subrahmanyam Kalyanasundaram, Maunendra Desarkar" }
      },
      "G": {
        "s12": null,
        "s34": { "code": "LA1760", "name": "Communication Skills", "room": "LHC-6" },
        "s56": { "code": "LA1760", "name": "Communication Skills", "room": "LHC-6" }
      },
      "E": {
        "s12": { "code": "ME2240", "name": "Fluid Mechanics", "room": "LHC-11" },
        "s34": { "code": "ME2240", "name": "Fluid Mechanics", "room": "LHC-11" },
        "s56": { "code": "ME2240", "name": "Fluid Mechanics", "room": "LHC-11" }
      },
      "S": {
        "s12": null,
        "s34": { "code": "MS2860", "name": "Computational Methods in Materials Science", "room": "LHC-2", "instructor": "Anuj Goyal" },
        "s56": { "code": "MS2860", "name": "Computational Methods in Materials Science", "room": "LHC-2", "instructor": "Anuj Goyal" }
      }
    },
    "sem5": {
      "Q": {
        "s12": { "code": "BT2053", "name": "Big Data Biology & Biological Databases", "room": "LHC-10", "instructor": "Rahul Kumar" },
        "s34": { "code": "BT2053", "name": "Big Data Biology & Biological Databases", "room": "LHC-10", "instructor": "Rahul Kumar" },
        "s56": { "code": "BT2053", "name": "Big Data Biology & Biological Databases", "room": "LHC-10", "instructor": "Rahul Kumar" }
      },
      "S": {
        "s12": { "code": "ME3030", "name": "Modelling and Simulation", "room": "LHC-3" },
        "s34": { "code": "ME3030", "name": "Modelling and Simulation", "room": "LHC-3" },
        "s56": { "code": "ME3030", "name": "Modelling and Simulation", "room": "LHC-3" }
      },
      "R": {
        "s12": { "code": "ME3180", "name": "FEM and CFD Theory", "room": "LHC-3" },
        "s34": { "code": "ME3180", "name": "FEM and CFD Theory", "room": "LHC-3" },
        "s56": { "code": "ME3180", "name": "FEM and CFD Theory", "room": "LHC-3" }
      }
    },
    "sem7": {}
  },
  "AN_BLOCKS": {
    "sem1": {
      "Tue": { "code": "ID1041", "name": "Engineering Drawing", "room": "LHC-6" },
      "Wed": { "code": "ID1063", "name": "Intro to Programming Lab", "room": "LHC-5+6", "instructor": "NR Aravind" }
    },
    "sem7": {
      "Wed": "SEM7_LAB"
    }
  },
  "GRID_ROWS": [
    { "time": "9:00–9:55",   "Mon":"A", "Tue":"D", "Wed":"B", "Thu":"C", "Fri":"E" },
    { "time": "10:00–10:55", "Mon":"B", "Tue":"E", "Wed":"C", "Thu":"A", "Fri":"F" },
    { "time": "11:00–11:55", "Mon":"C", "Tue":"F", "Wed":"A", "Thu":"B", "Fri":"D" },
    { "time": "12:00–12:55", "Mon":"D", "Tue":"G", "Wed":"G", "Thu":"E", "Fri":"G" },
    { "time": "12:55–14:30", "isBreak": true, "label": "Lunch Break" },
    { "time": "14:30–15:55", "Mon":"P", "Tue":"R", "Wed":"AN", "Thu":"Q", "Fri":"S", "isAN1": true },
    { "time": "16:00–17:25", "Mon":"Q", "Tue":"S", "Wed":"AN", "Thu":"P", "Fri":"R", "isAN2": true },
    { "time": "17:30–19:00", "Mon":"W", "Tue":"Y", "Wed":"",  "Thu":"W", "Fri":"Y" },
    { "time": "19:00–20:30", "Mon":"X", "Tue":"Z", "Wed":"",  "Thu":"X", "Fri":"Z" }
  ],
  "unscheduled": {
    "sem5": [{ "code": "LA", "name": "LA/CA Elective", "credits": 1 }],
    "sem7": [
      { "code": "CO-DE", "name": "Department Electives", "credits": 5 },
      { "code": "FE",    "name": "Free Electives",        "credits": 4 },
      { "code": "LA",    "name": "LA/CA Elective",        "credits": 3 }
    ]
  },
  "DAYS": ["Mon", "Tue", "Wed", "Thu", "Fri"]
}
;
