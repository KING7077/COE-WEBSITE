// Curriculum structure for the B.Tech in Computational Engineering.
// Shared by curriculum.html and courses.html.
// Course tuple: [code, name, credits, basket, note, isBasketPlaceholder]
window.BASKETS = {
  BS: { name: 'Basic Sciences', color: 'var(--c-bs)' },
  BE: { name: 'Basic Engineering', color: 'var(--c-be)' },
  DC: { name: 'Departmental Core', color: 'var(--c-dc)' },
  DE: { name: 'Departmental Electives', color: 'var(--c-de)' },
  LA: { name: 'Liberal / Creative Arts', color: 'var(--c-la)' },
  SK: { name: 'Soft & Career Skills', color: 'var(--c-sk)' },
  FE: { name: 'Free Electives', color: 'var(--c-fe)' },
};

// Latest curriculum, from the Jul–Nov 2026 and Jan–Apr 2027 time tables.
window.SEMESTERS = [
  { n: 1, term: 'July – November', courses: [
    ['MA1110', 'Calculus I', 1, 'BS'],
    ['MA1220', 'Calculus II', 1, 'BS'],
    ['EP1108', 'Modern Physics', 2, 'BS'],
    ['CY1010', 'Environmental Chemistry', 2, 'BS'],
    ['BT1010', 'Introduction to Life Sciences', 1, 'BS'],
    ['ID1063', 'Introduction to Programming (Theory + Lab)', 3, 'BE'],
    ['ID1041', 'Engineering Drawing', 2, 'BE'],
    ['EE1202', 'Digital Circuits', 3, 'DC'],
    ['MS1980', 'Fundamentals of Scientific Computing', 2, 'DC'],
  ]},
  { n: 2, term: 'January – April', courses: [
    ['MA1140', 'Elementary Linear Algebra', 1, 'BS'],
    ['MA1150', 'Differential Equations', 1, 'BS'],
    ['BM1030', 'Bioengineering', 2, 'BE'],
    ['ID1054', 'Digital Fabrication', 2, 'BE'],
    ['ME1080', 'Introduction to Engineering Materials', 2, 'BE'],
    ['CH1140', 'Thermodynamic Laws and Phase Transitions', 3, 'DC'],
    ['CO1020', 'Computer Aided Numerical Methods I', 2, 'DC'],
    ['EE3402', 'Introduction to Hardware Description Language', 1, 'DC'],
    ['', 'Introduction to Entrepreneurship', 1, 'SK', 'or an LA/CA elective'],
    ['', 'LA/CA Elective', 1, 'LA'],
  ]},
  { n: 3, term: 'July – November', courses: [
    ['MA2110', 'Probability', 1, 'BS'],
    ['MA2120', 'Transform Techniques', 1, 'BS'],
    ['ID2230', 'Data Structures & Applications', 3, 'BE'],
    ['BT1020', 'Basic Bioinformatics', 2, 'DC'],
    ['CS3510', 'Operating Systems I', 1, 'DC'],
    ['ME2110', 'Mechanics of Solids', 3, 'DC'],
    ['ME2240', 'Fluid Mechanics', 3, 'DC'],
    ['MS2860', 'Computational Methods in Materials Science', 2, 'DC'],
    ['LA1760', 'Communication Skills', 2, 'SK'],
  ]},
  { n: 4, term: 'January – April', courses: [
    ['MA2140', 'Introduction to Statistics', 1, 'BS'],
    ['MA2130', 'Complex Variables', 1, 'BS'],
    ['ME3110', 'Heat and Mass Transfer', 3, 'DC'],
    ['CO2020', 'Computer Aided Numerical Methods II', 3, 'DC'],
    ['BT2060', 'Molecular and Cellular Biology', 3, 'DC'],
    ['MS4480', 'AI in Materials Science and Engineering', 3, 'DC'],
    ['CS3523', 'Operating Systems II (Theory + Lab)', 3, 'DC'],
    ['CH5150', 'Optimization Techniques I', 2, 'DC'],
  ]},
  { n: 5, term: 'July – November', courses: [
    ['ME3030', 'Modelling and Simulation', 3, 'DC'],
    ['ME3180', 'FEM and CFD Theory', 3, 'DC'],
    ['BT2053', 'Big Data Biology & Biological Databases', 3, 'DC'],
    ['', 'Parallel, Distributed & HPC Basket', 3, 'DC', 'one course, here or in Sem 6', true],
    ['', 'LA/CA Elective', 1, 'LA'],
  ]},
  { n: 6, term: 'January – April', courses: [
    ['', 'Internship, or Department Electives (3) + Project (3)', 6, 'DE', null, true],
    ['', 'Free Electives', 3, 'FE', null, true],
    ['', 'LA/CA Electives', 2, 'LA', null, true],
    ['', 'Parallel, Distributed & HPC Basket', '—', 'DC', 'if not taken in Sem 5', true],
  ], note: 'Batch 2024 also takes MS4480 (AI in Materials Science and Engineering, 3) and CH5150 (Optimization Techniques I, 2) in this semester. From Batch 2025 onwards these are taken in Semester 4.' },
  { n: 7, term: 'July – November', courses: [
    ['ME3445', 'FEM Lab', 1, 'DC'],
    ['ME3455', 'CFD Lab', 1, 'DC'],
    ['', 'Department Electives', 5, 'DE', null, true],
    ['', 'Free Electives', 4, 'FE', null, true],
    ['', 'LA/CA Electives', 3, 'LA', null, true],
  ]},
  { n: 8, term: 'January – April', courses: [
    ['CO4015', 'Department Project', 3, 'DC'],
    ['ID4006', 'Ethics and Values', 1, 'LA'],
    ['', 'Department Electives', 6, 'DE', null, true],
    ['', 'Free Electives', 4, 'FE', null, true],
    ['', 'LA/CA Elective', 1, 'LA', null, true],
  ]},
];
