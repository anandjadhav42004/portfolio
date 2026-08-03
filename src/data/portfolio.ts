export const portfolioData = {
  name: 'Anand Jadhav',
  title: 'SAP Developer · Full Stack Engineer · iOS Developer',
  subtitle: 'B.Tech Computer Science & Engineering @ Parul University',
  bio: 'Specializing in enterprise SAP BTP & ABAP Cloud architectures, scalable full-stack web applications (React, Angular, Node.js), and native iOS development (SwiftUI). Focused on high-availability cloud integrations and automated AI pipelines.',
  email: 'anandjadhav42004@gmail.com',
  phone: '+91 8308008154',
  location: 'Mumbai / Vadodara, India',
  github: 'anandjadhav42004',
  linkedin: 'anand-jadhav-b599801b5',
  twitter: 'anandjadhav',
};

export const skills = {
  sap: [
    { name: 'ABAP Cloud / RAP', level: 90 },
    { name: 'SAP BTP Ecosystem', level: 88 },
    { name: 'SAPUI5 & Fiori Elements', level: 86 },
    { name: 'OData V2/V4 Services', level: 85 },
  ],
  web: [
    { name: 'React / Next.js', level: 94 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js & Express', level: 88 },
    { name: 'Angular (MEAN)', level: 84 },
    { name: 'Tailwind CSS / UI Systems', level: 96 },
  ],
  ios_ai: [
    { name: 'SwiftUI & Combine', level: 86 },
    { name: 'CoreData / Swift Data', level: 82 },
    { name: 'Python & Flask APIs', level: 84 },
    { name: 'TensorFlow / AI Pipelines', level: 78 },
  ],
  database: [
    { name: 'PostgreSQL / SQL', level: 88 },
    { name: 'MongoDB Architecture', level: 86 },
    { name: 'SAP HANA Cloud', level: 82 },
    { name: 'Firebase / Redis', level: 80 },
  ],
  tools: [
    { name: 'Git & GitHub CI/CD', level: 92 },
    { name: 'Docker & Containers', level: 82 },
    { name: 'SAP BAS & ADT', level: 88 },
    { name: 'Vercel / Netlify Deployment', level: 90 },
  ]
};

export const projects = [
  {
    id: 1,
    title: 'Elvora Media Platform',
    description: 'High-performance digital production agency web platform engineered for dynamic content delivery, smooth responsive layouts, and modern cinematic visual storytelling.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
    github: 'https://github.com/anandjadhav42004/Elvora-Media-Premium-Digital-Media-Production-Agency',
    live: 'https://elvora-media.netlify.app',
    category: 'Full Stack Web',
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'KS Beauty Web Application',
    description: 'E-commerce and service platform crafted with modular React components, custom interactive quote calculators, and optimized responsive user journeys.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=450&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/anandjadhav42004/ks-beauty-website',
    live: 'https://ks-beauty-website.vercel.app',
    category: 'Full Stack Web',
    status: 'In Progress'
  },
  {
    id: 3,
    title: 'Event Management (Utsav26)',
    description: 'Comprehensive campus event management system featuring live schedule tracking, participant registrations, ticket verifications, and real-time status updates.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    github: 'https://github.com/anandjadhav42004/event_management',
    live: 'https://utsav26.netlify.app',
    category: 'Enterprise App'
  },
  {
    id: 4,
    title: 'FunFlix — Netflix-Inspired Streaming Platform',
    description: 'A full-featured streaming platform UI built from scratch, replicating a real streaming service. Cinematic intro animation, dynamic genre-based content rows, real-time TMDB search, trailer modals, persistent "My List", fully responsive.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop',
    tags: ['React', 'Vite', 'React Router', 'Axios', 'TMDB API', 'Lucide Icons'],
    github: '[YOUR_REPO_LINK]',
    live: 'https://funflix03.netlify.app',
    category: 'Web App'
  },
  {
    id: 5,
    title: 'Anashi Cinematic Thrift Store',
    description: 'Curated e-commerce storefront featuring vintage fashion catalogs, smooth cart management, product filtering, and mobile-first design.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=450&fit=crop',
    tags: ['React', 'Tailwind CSS', 'State Management', 'Netlify'],
    github: 'https://github.com/anandjadhav42004/anashi-cinematic-thrift',
    live: 'https://anashistore.netlify.app',
    category: 'E-Commerce'
  },
  {
    id: 6,
    title: 'Anashi Candles Artisanal Store',
    description: 'Minimalist brand website and product display experience built for handcrafted artisanal candles, featuring subtle ambient animations.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=450&fit=crop',
    tags: ['React', 'CSS Utilities', 'Netlify'],
    github: 'https://github.com/anandjadhav42004/anashi_candle',
    live: 'https://anashicandles.netlify.app',
    category: 'Web App'
  },
  {
    id: 7,
    title: 'ProFlow SAP Enterprise AI',
    description: 'Enterprise workflow automation combining MEAN stack with Google Gemini AI to process, summarize, and route SAP system requests.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
    tags: ['SAP BTP', 'Angular', 'Node.js', 'Express', 'Gemini AI'],
    github: 'https://github.com/anandjadhav42004/portfolio',
    live: 'https://portfolio-three-swart-hx117dkm4.vercel.app',
    category: 'SAP & AI'
  },
  {
    id: 8,
    title: 'Inventory Pro Management Suite',
    description: 'Enterprise-grade SAPUI5 warehouse management system (MVC architecture). Admin console with live KPI dashboards, stock microcharts, batch CRUD, Excel export. Staff portal with glassmorphism UI, high-speed search, role-based access.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=450&fit=crop',
    tags: ['SAPUI5', 'JSON Models', 'LocalStorage API', 'SAP BAS'],
    github: '[YOUR_REPO_LINK]',
    live: '[YOUR_LIVE_LINK]',
    category: 'Enterprise App'
  },
  {
    id: 9,
    title: 'Anti-Gravity — AI Authenticity Verification System',
    description: 'AI-powered deepfake and misinformation detection tool using NLP and neural networks, analyzing text/image/video in real time. Flask backend, cyberpunk-themed responsive frontend.',
    image: 'https://images.unsplash.com/photo-1620825937374-87fc7d62828e?w=800&h=450&fit=crop',
    tags: ['Python', 'Flask', 'Scikit-learn', 'NLP', 'HTML5', 'CSS3', 'JavaScript'],
    github: '[YOUR_REPO_LINK]',
    live: '[YOUR_LIVE_LINK]',
    category: 'AI / Machine Learning'
  }
];

export const certifications = [
  {
    id: 1,
    name: 'SAP Certified Associate - Back-End Developer - ABAP Cloud',
    issuer: 'SAP',
    date: 'Jul 2025',
    expiry: 'Jul 2026',
    credentialUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    skills: ['ABAP Cloud', 'SAP BTP', 'OData Services', 'SAP Fiori', 'SAP HANA', 'RAP Architecture'],
    highlight: true
  },
  {
    id: 2,
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle Cloud',
    date: 'Sep 2025',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    skills: ['Artificial Intelligence', 'Machine Learning', 'OCI Cloud Services', 'Deep Learning'],
    highlight: true
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
    id: 7,
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialId: '5BE0C46B5690',
    credentialUrl: 'https://www.hackerrank.com/certificates/5BE0C46B5690',
    skills: ['SQL Fundamentals', 'Joins', 'Basic Aggregations'],
  },
  {
    id: 5,
    name: 'Java (Basic)',
    issuer: 'HackerRank',
    date: 'May 2026',
    credentialId: '221b21c250dc',
    credentialUrl: 'https://www.hackerrank.com/certificates/221b21c250dc',
    skills: ['Java', 'Object-Oriented Programming (OOP)', 'Data Structures'],
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

export const linkedinPost = {
  title: 'Engineering Enterprise Automation: Integrating SAP BTP with Modern Full-Stack AI Pipelines',
  date: 'May 2026',
  excerpt: 'A technical breakdown of an end-to-end automation workflow built using SAP BTP, ABAP OData endpoints, Angular, Node.js, and generative AI APIs for real-time enterprise request handling.',
  url: 'https://www.linkedin.com/in/anand-jadhav-b599801b5/',
};

export const experience = [
  {
    id: 1,
    title: 'Enterprise Software Intern',
    company: 'SAP UI5 / Cloud Development',
    duration: '2024 - Present',
    description: 'Constructed custom business logic UI panels in SAP Fiori & SAPUI5. Configured SAP Cloud Connector and OData integration pipelines on SAP Business Technology Platform (BTP).',
    type: 'internship',
  },
  {
    id: 2,
    title: 'Full Stack & iOS Engineer',
    company: 'Independent Projects & Solutions',
    duration: '2022 - Present',
    description: 'Engineered 7+ production web applications and native SwiftUI iOS apps. Integrated Flask/TensorFlow backend endpoints for machine learning automated analysis.',
    type: 'freelance',
  },
];

export const stats = {
  projectsCompleted: 7,
  certifications: 6,
  githubContributions: 620,
};
