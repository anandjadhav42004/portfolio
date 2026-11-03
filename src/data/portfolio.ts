// ============================================================
// PORTFOLIO DATA — Anand Jadhav
// Computer Science Engineer · Full-Stack & UI/Frontend Developer
// Source: Official Resume (2026/2027)
// ============================================================

export const portfolioData = {
  name: 'Anand Jadhav',
  title: 'Computer Science Engineer · UI / Frontend Developer',
  subtitle: 'Building responsive, user-friendly interfaces with React, TypeScript, Angular & SAPUI5.',
  bio: 'Final-year B.Tech Computer Science student (graduating 2027, SAP IEP Track) at Parul Institute of Technology. Experienced in building responsive interfaces, KPI dashboards, and full-stack web applications with React, Next.js, SAPUI5, and Node.js.',
  email: 'anandjadhav42004@gmail.com',
  phone: '+91 83080 08154',
  location: 'Vadodara, Gujarat, India',
  enrollmentNo: '2303031570026',
  github: 'anandjadhav42004',
  linkedin: 'anand-jadhav-b599801b5',
  githubUrl: 'https://github.com/anandjadhav42004',
  linkedinUrl: 'https://www.linkedin.com/in/anand-jadhav-b599801b5',
  leetcode: 'Anand_42004',
  leetcodeUrl: 'https://leetcode.com/u/Anand_42004/',
};

// ============================================================
// WORK EXPERIENCE / INTERNSHIPS
// ============================================================
export const experience = [
  {
    id: 1,
    company: 'Hilti Manufacturing India Pvt. Ltd.',
    title: 'SAP and Information Technology Intern',
    duration: 'July 2026 – Present',
    status: 'CURRENT INTERNSHIP',
    location: 'Vadodara, Gujarat, India (On-site Plant)',
    team: 'Production Planning and Control (PPC)',
    bullets: [
      'Work in the Production Planning and Control (PPC) team on SAP S/4HANA Cloud at the Vadodara manufacturing plant.',
      'Support SAP Production Planning (PP) processes and actively collaborate with cross-functional business users.',
      'Analyze enterprise manufacturing workflows and bridge technology with operational requirements at plant scale.',
    ],
    skills: ['SAP S/4HANA Cloud', 'Production Planning (PP)', 'PPC Operations', 'Enterprise IT', 'Data Analysis'],
  },
  {
    id: 2,
    company: 'UptoSkills',
    title: 'Backend Developer Intern',
    duration: 'May 2026 – August 2026',
    status: 'COMPLETED INTERNSHIP',
    location: 'Remote',
    team: 'Backend Engineering',
    bullets: [
      'Developed and maintained backend features in a high-throughput production codebase using Node.js, Express.js, and MongoDB.',
      'Took end-to-end ownership of assigned backend modules, resolved critical defects, and optimized API latency.',
      'Applied rigorous code review feedback, automated validations, and maintained modular architecture for team scalability.',
    ],
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Code Reviews', 'Software Testing'],
  },
];

// ============================================================
// EDUCATION
// ============================================================
export const education = [
  {
    id: 1,
    degree: 'B.Tech. Computer Science & Engineering',
    specialization: 'SAP IEP Track',
    institute: 'Parul Institute of Technology',
    period: '2023 – 2027',
    score: 'CGPA: 6.67 / 10',
    highlight: true,
  },
  {
    id: 2,
    degree: 'HSC (Science)',
    specialization: 'Higher Secondary Education',
    institute: 'Dayanand Science College, Latur',
    period: '2021',
    score: '94.67%',
    highlight: false,
  },
  {
    id: 3,
    degree: 'SSC (CBSE)',
    specialization: 'Secondary School Examination',
    institute: 'Yashwant International School, Kodoli',
    period: '2019',
    score: '75.40%',
    highlight: false,
  },
];

// ============================================================
// TECHNICAL SKILLS
// ============================================================
export const skills = {
  frontend: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML5 & CSS3',
    'Tailwind CSS',
    'Responsive Web Design',
    'UI Design',
    'Framer Motion',
    'Angular',
    'SAPUI5 & Fiori Elements',
    'Reusable UI Components',
    'Data Visualization',
    'KPI Dashboards',
  ],
  backend: [
    'Python',
    'Java',
    'C / C++',
    'SQL',
    'Node.js & Express.js',
    'FastAPI',
    'Flask',
    'REST APIs',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'JWT & RBAC Authentication',
    'OData V2/V4',
  ],
  ai_ml: [
    'TensorFlow',
    'XGBoost',
    'Prophet',
    'Pandas',
    'Time-Series Forecasting',
    'LLM Integration (Google Gemini API)',
    'AI Agents',
    'Deepfake Detection',
  ],
  tools_core: [
    'Git & GitHub',
    'VS Code',
    'Vercel',
    'Debugging & Testing',
    'Data Structures & Algorithms',
    'Object-Oriented Programming (OOP)',
    'MVC Architecture',
    'SDLC & Agile',
  ],
};

// ============================================================
// PROJECTS — From Resume
// ============================================================
export const projects = [
  {
    id: 1,
    title: 'SAP Prognos — AI Demand Forecasting Platform',
    category: 'SAPUI5 & AI/ML',
    year: '2026',
    stack: 'SAPUI5, FastAPI, Python, XGBoost, Prophet',
    description: 'Built a full-stack platform (final year project) with interactive actual-vs-forecast visualizations and role-based dashboard views in SAPUI5; compared XGBoost and Prophet by MAPE and deployed on Vercel.',
    image: '/sap_prognos_dashboard.jpg',
    tags: ['SAPUI5', 'XGBoost', 'Prophet', 'FastAPI', 'Python', 'Vercel'],
    live: 'https://sap-forecast.vercel.app',
    github: 'https://github.com/anandjadhav42004/sap_Forecast',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Inventory Pro — Warehouse Management System',
    category: 'Enterprise SAP App',
    year: '2025',
    stack: 'SAPUI5, SAP Fiori, JavaScript, OData, SAP BTP',
    description: 'Developed a warehouse management app (MVC, OData) with KPI dashboards and Excel export; redesigned navigation with custom UI components, cutting task navigation time by 30%.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&fit=crop',
    tags: ['SAPUI5', 'SAP Fiori', 'OData', 'SAP BTP', 'KPI Dashboards'],
    live: 'https://github.com/anandjadhav42004',
    github: 'https://github.com/anandjadhav42004',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'ProFlow — SaaS Project Management Platform',
    category: 'Full-Stack MEAN + AI',
    year: '2025',
    stack: 'Angular, Node.js, MongoDB, Google Gemini API, JWT',
    description: 'Engineered a full-stack SaaS platform on the MEAN stack with RBAC and JWT auth. Integrated Google Gemini API to automate task generation and sprint planning, improving team productivity by 55%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop',
    tags: ['Angular', 'Node.js', 'MongoDB', 'Gemini AI', 'JWT Auth'],
    live: 'https://github.com/anandjadhav42004',
    github: 'https://github.com/anandjadhav42004',
    isFeatured: true,
  },
  {
    id: 4,
    title: 'DisasterLink — Disaster Response Platform',
    category: 'Real-Time Full-Stack',
    year: '2026',
    stack: 'Next.js, TypeScript, Express.js, PostgreSQL',
    description: 'Built a real-time platform connecting survivors, volunteers, and authorities through SOS alerts, live mapping, and low-bandwidth emergency communication.',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'SOS Mapping'],
    live: 'https://github.com/anandjadhav42004',
    github: 'https://github.com/anandjadhav42004',
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Deepfake Detection AI & Verification Platform',
    category: 'AI / Forensic Security',
    year: '2025–2026',
    stack: 'TensorFlow, Flask API, PyTorch, React',
    description: 'Multimodal authenticity and digital provenance platform for deepfake detection, forensic spectral anomaly analysis, and GAN artifact identification.',
    image: '/antigravity_verification.jpg',
    tags: ['TensorFlow', 'Flask API', 'Deepfake Detection', 'React'],
    live: 'https://www.elvoramedia.org',
    github: 'https://github.com/anandjadhav42004',
    isFeatured: false,
  },
  {
    id: 6,
    title: 'ScammersAreCooked — AI Honeypot',
    category: 'AI Agents / Buildathon',
    year: '2026',
    stack: 'Python, AI Agents, LLMs, Flask',
    description: 'An AI-agent scam-detection honeypot engineered for the India AI Impact Buildathon 2026 to engage, trace, and dismantle phishing and social engineering vectors.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&fit=crop',
    tags: ['AI Agents', 'Scam Honeypot', 'Python', 'Buildathon 2026'],
    live: 'https://github.com/anandjadhav42004',
    github: 'https://github.com/anandjadhav42004',
    isFeatured: false,
  },
];

// ============================================================
// CERTIFICATIONS — Verified From Resume
// ============================================================
export const certifications = [
  {
    id: 1,
    name: 'SAP Certified Associate - Back-End Developer - ABAP Cloud',
    issuer: 'SAP',
    date: 'July 2025',
    credentialUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    skills: ['ABAP Cloud', 'SAP BTP', 'OData Services', 'RAP Architecture'],
    highlight: true,
  },
  {
    id: 2,
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'September 2025',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    skills: ['Artificial Intelligence', 'Machine Learning', 'OCI Cloud Services'],
    highlight: true,
  },
  {
    id: 3,
    name: 'HackerRank: Frontend Developer (React)',
    issuer: 'HackerRank',
    date: 'August 2025',
    credentialUrl: 'https://www.hackerrank.com/certificates/d9d625dc257d',
    skills: ['React.js', 'Front-End Architecture', 'JavaScript ES6+'],
    highlight: true,
  },
  {
    id: 4,
    name: 'HackerRank: SQL (Basic & Intermediate)',
    issuer: 'HackerRank',
    date: 'January 2026',
    credentialUrl: 'https://www.hackerrank.com/certificates/5BE0C46B5690',
    skills: ['Relational Databases', 'Complex SQL Queries', 'Performance'],
    highlight: false,
  },
  {
    id: 5,
    name: 'HackerRank: Java (Basic)',
    issuer: 'HackerRank',
    date: '2025',
    credentialUrl: 'https://www.hackerrank.com/certificates/221b21c250dc',
    skills: ['Java', 'OOP', 'Data Structures'],
    highlight: false,
  },
];

export const stats = {
  projectsCompleted: 6,
  certifications: 5,
  githubContributions: 620,
};
