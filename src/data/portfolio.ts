// ============================================================
// PORTFOLIO DATA — Anand Jadhav
// Computer Science Engineer · Full-Stack & Software Developer
// ============================================================

export const portfolioData = {
  name: 'Anand Jadhav',
  title: 'Computer Science Engineer · Full-Stack Developer',
  subtitle: 'Building reliable software and web applications that solve real problems.',
  bio: 'CSE student (SAP IEP Track) at Parul Institute of Technology. I design and build web applications, enterprise software, and mobile apps — working across frontend, backend, and databases.',
  email: 'anandjadhav42004@gmail.com',
  phone: '+91 8308008154',
  location: 'Mumbai / Vadodara, India',
  github: 'anandjadhav42004',
  linkedin: 'anand-jadhav-b599801b5',
  twitter: 'anandjadhav',
  leetcode: 'Anand_42004',
  leetcodeUrl: 'https://leetcode.com/u/Anand_42004/',
};

// ============================================================
// SKILLS — Grouped by engineering discipline, no arbitrary %
// Only technologies actually used in projects
// ============================================================
export const skills = {
  frontend: [
    { name: 'React.js', level: 92 },
    { name: 'TypeScript', level: 88 },
    { name: 'Next.js', level: 80 },
    { name: 'Tailwind CSS / UI Systems', level: 94 },
    { name: 'Framer Motion', level: 80 },
    { name: 'SAPUI5 & Fiori Elements', level: 82 },
  ],
  backend: [
    { name: 'Node.js & Express', level: 86 },
    { name: 'PostgreSQL & Prisma ORM', level: 82 },
    { name: 'MongoDB', level: 80 },
    { name: 'Python & Flask / FastAPI', level: 78 },
    { name: 'OData V2/V4 Services (SAP)', level: 80 },
    { name: 'REST API Design', level: 86 },
  ],
  mobile_enterprise: [
    { name: 'SwiftUI (iOS)', level: 80 },
    { name: 'ABAP Cloud / RAP (SAP)', level: 82 },
    { name: 'SAP BTP Ecosystem', level: 78 },
    { name: 'Angular (MEAN)', level: 78 },
  ],
  core_cs: [
    { name: 'Data Structures & Algorithms', level: 82 },
    { name: 'Object-Oriented Programming', level: 88 },
    { name: 'Relational Databases / SQL', level: 86 },
    { name: 'Git & GitHub CI/CD', level: 90 },
    { name: 'Docker & Containers', level: 76 },
    { name: 'Machine Learning Concepts', level: 74 },
  ],
};

// ============================================================
// PROJECTS — Anand's actual projects with real links
// Note: DisasterLink and Inventory Pro were NOT in the original
//       codebase — removed. R2_PROTO is also NOT Anand's project.
// ============================================================
export const projects = [
  {
    id: 1,
    title: 'Anti-Gravity — AI Authenticity Verification System',
    description: 'Enterprise AI authenticity and digital provenance platform for multimodal deepfake detection, forensic spectral anomaly analysis, and cryptographic authenticity verification. Analyzes facial landmark tensor meshes and GAN artifacts to certify media integrity.',
    image: '/antigravity_verification.jpg',
    tags: ['Deepfake Detection', 'PyTorch', 'TensorFlow', 'Spectral Analysis', 'React', 'FastAPI'],
    github: 'https://github.com/anandjadhav42004',
    live: 'https://www.elvoramedia.org',
    category: 'AI / ML',
    status: 'PROTOTYPE',
    isFeaturedCaseStudy: true,
  },
  {
    id: 2,
    title: 'SAP Prognos — Enterprise AI Demand Forecasting',
    description: 'Enterprise-grade SAPUI5 application integrated with an XGBoost ML pipeline for supply chain demand forecasting. Features Chart.js multi-horizon predictive curves, real-time KPI metrics, and live Vercel deployment.',
    image: '/sap_prognos_dashboard.jpg',
    tags: ['SAPUI5', 'XGBoost ML', 'Chart.js', 'Python', 'SAP Horizon Dark', 'Vercel'],
    github: 'https://github.com/anandjadhav42004/sap_Forecast',
    live: 'https://sap-forecast.vercel.app',
    category: 'Enterprise App',
    status: 'PRODUCTION',
    isFeaturedCaseStudy: true,
  },
  {
    id: 3,
    title: 'Elvora Media Platform',
    description: 'High-performance digital production agency platform engineered for dynamic content delivery, smooth responsive layouts, and modern cinematic visual storytelling.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    github: 'https://github.com/anandjadhav42004/Elvora-Media-Premium-Digital-Media-Production-Agency',
    live: 'https://www.elvoramedia.org',
    category: 'Full Stack Web',
    status: 'COMPLETED',
  },
  {
    id: 4,
    title: 'KS Beauty Web Application',
    description: 'E-commerce and service platform with modular React components, custom interactive quote calculators, product filtering, and mobile-first responsive design.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=450&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/anandjadhav42004/ks-beauty-website',
    live: 'https://ks-beauty-website.vercel.app',
    category: 'Full Stack Web',
    status: 'IN PROGRESS',
  },
  {
    id: 5,
    title: 'Event Management — Utsav26',
    description: 'Campus event management system with live schedule tracking, participant registrations, ticket verifications, and real-time status updates.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    github: 'https://github.com/anandjadhav42004/event_management',
    live: 'https://utsav26.netlify.app',
    category: 'Full Stack Web',
    status: 'COMPLETED',
  },
  {
    id: 6,
    title: 'FunFlix — Streaming Platform UI',
    description: 'Full-featured streaming platform UI with cinematic intro animation, dynamic genre-based content rows, real-time TMDB search, trailer modals, and persistent "My List".',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop',
    tags: ['React', 'Vite', 'React Router', 'Axios', 'TMDB API', 'Lucide Icons'],
    github: 'https://github.com/anandjadhav42004',
    live: 'https://funflix03.netlify.app',
    category: 'Web App',
    status: 'COMPLETED',
  },
  {
    id: 7,
    title: 'ProFlow SAP Enterprise AI',
    description: 'Enterprise workflow automation combining MEAN stack with Google Gemini AI to process, summarize, and route SAP system requests through NLP-based categorization.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
    tags: ['SAP BTP', 'Angular', 'Node.js', 'Express', 'Gemini AI'],
    github: 'https://github.com/anandjadhav42004',
    live: '',
    category: 'Enterprise App',
    status: 'PROTOTYPE',
  },
  {
    id: 8,
    title: 'Anashi Cinematic Thrift Store',
    description: 'Curated e-commerce storefront with vintage fashion catalogs, smooth cart management, product filtering, and mobile-first design.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=450&fit=crop',
    tags: ['React', 'Tailwind CSS', 'State Management', 'Netlify'],
    github: 'https://github.com/anandjadhav42004/anashi-cinematic-thrift',
    live: 'https://anashistore.netlify.app',
    category: 'Web App',
    status: 'COMPLETED',
  },
];

// ============================================================
// CERTIFICATIONS
// ============================================================
export const certifications = [
  {
    id: 1,
    name: 'SAP Certified Associate - Back-End Developer - ABAP Cloud',
    issuer: 'SAP',
    date: 'Jul 2025',
    expiry: 'Jul 2026',
    credentialUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    skills: ['ABAP Cloud', 'SAP BTP', 'OData Services', 'SAP Fiori', 'SAP HANA', 'RAP Architecture'],
    highlight: true,
  },
  {
    id: 2,
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle Cloud',
    date: 'Sep 2025',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    skills: ['Artificial Intelligence', 'Machine Learning', 'OCI Cloud Services', 'Deep Learning'],
    highlight: true,
  },
  {
    id: 3,
    name: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    date: 'Aug 2025',
    credentialId: 'D9D625DC257D',
    credentialUrl: 'https://www.hackerrank.com/certificates/d9d625dc257d',
    skills: ['React.js', 'Front-End Architecture', 'JavaScript ES6+', 'State Management'],
  },
  {
    id: 4,
    name: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialId: '5BE0C46B5690',
    credentialUrl: 'https://www.hackerrank.com/certificates/5BE0C46B5690',
    skills: ['Relational Databases', 'Complex SQL Queries', 'Indexing & Performance'],
  },
  {
    id: 5,
    name: 'Java (Basic)',
    issuer: 'HackerRank',
    date: 'May 2026',
    credentialId: '221b21c250dc',
    credentialUrl: 'https://www.hackerrank.com/certificates/221b21c250dc',
    skills: ['Java', 'Object-Oriented Programming', 'Data Structures'],
  },
  {
    id: 6,
    name: 'Electronic Arts - Software Engineering Simulation',
    issuer: 'Forage',
    date: 'Jul 2025',
    credentialId: 'TpjjDh3DyagxGNJo4',
    credentialUrl: 'https://www.theforage.com/',
    skills: ['Software Architecture', 'System Design', 'Code Optimization'],
  },
];

// ============================================================
// EXPERIENCE
// ============================================================
export const linkedinPost = {
  title: 'Engineering Enterprise Automation: Integrating SAP BTP with Modern Full-Stack AI Pipelines',
  date: 'May 2026',
  excerpt: 'A technical breakdown of an end-to-end automation workflow built using SAP BTP, ABAP OData endpoints, Angular, Node.js, and generative AI APIs for real-time enterprise request handling.',
  url: 'https://www.linkedin.com/in/anand-jadhav-b599801b5/',
};

export const experience = [
  {
    id: 1,
    title: 'SAP & IT Support Intern',
    company: 'Hilti Manufacturing India Pvt. Ltd.',
    duration: 'July 2026 – Present',
    description: 'Working on SAP-driven business processes, production planning, and IT systems supporting day-to-day manufacturing operations. Gaining hands-on exposure to SAP S/4HANA within a real manufacturing environment, developing understanding of how technology, process, and business requirements integrate at enterprise scale.',
    type: 'internship',
    location: 'Vadodara, Gujarat, India (On-site)',
    function: 'Production Planning & Control (PPC)',
    skills: ['SAP S/4HANA', 'Production Planning', 'Enterprise IT', 'Manufacturing Operations', 'Data Analysis'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Hilti_Logo.svg',
  },
  {
    id: 2,
    title: 'Enterprise Software Developer',
    company: 'SAP UI5 / Cloud Development',
    duration: '2024 – Present',
    description: 'Constructed custom business logic UI panels in SAP Fiori & SAPUI5. Configured SAP Cloud Connector and OData integration pipelines on SAP Business Technology Platform (BTP). Built the SAP Prognos demand forecasting application with XGBoost ML integration.',
    type: 'internship',
    skills: ['SAP BTP', 'SAPUI5', 'ABAP Cloud', 'OData V4', 'XGBoost', 'Python'],
  },
  {
    id: 3,
    title: 'Full-Stack Developer',
    company: 'Independent Projects',
    duration: '2022 – Present',
    description: 'Engineered 7+ production web applications and an iOS app. Built the Elvora Media Platform, KS Beauty e-commerce site, Utsav26 event management system, and the Anti-Gravity AI verification tool. Integrated Flask/TensorFlow backends for ML analysis.',
    type: 'freelance',
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'SwiftUI'],
  },
];

export const stats = {
  projectsCompleted: 7,
  certifications: 6,
  githubContributions: 620,
};
