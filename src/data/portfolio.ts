export const portfolioData = {
  name: 'Anand Jadhav',
  title: 'SAP Developer · Full Stack Engineer · iOS Developer',
  subtitle: 'B.Tech CSE @ Parul University',
  bio: 'I am a B.Tech Computer Science student specializing in SAP Enterprise Solutions, Full-Stack Web architectures (MEAN/MERN), and native iOS development with SwiftUI. Passionate about automating systems and integrating AI pipelines into production.',
  email: 'anandjadhav42004@gmail.com',
  phone: '+91 8308008154',
  location: 'Mumbai / Vadodara, India',
  github: 'anandjadhav',
  linkedin: 'anand-jadhav-b599801b5',
  twitter: 'anandjadhav',
}

export const skills = {
  sap: [
    { name: 'ABAP Cloud', level: 90 },
    { name: 'SAP BTP', level: 85 },
    { name: 'SAPUI5 / Fiori', level: 88 },
    { name: 'OData Services', level: 82 },
  ],
  web: [
    { name: 'React / Next.js', level: 92 },
    { name: 'Angular (MEAN)', level: 85 },
    { name: 'Node.js / Express', level: 88 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'TypeScript', level: 86 },
  ],
  ios_ai: [
    { name: 'Swift / SwiftUI', level: 84 },
    { name: 'TensorFlow', level: 75 },
    { name: 'Python', level: 80 },
    { name: 'Flask API', level: 82 },
  ],
  database: [
    { name: 'SQL', level: 85 },
    { name: 'MongoDB', level: 88 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'Firebase', level: 78 },
  ],
  tools: [
    { name: 'Git & GitHub', level: 90 },
    { name: 'Docker', level: 80 },
    { name: 'SAP BAS', level: 85 },
    { name: 'Vercel / Cloud', level: 88 },
  ]
}

export const projects = [
  {
    id: 1,
    title: 'ProFlow Workflow AI',
    description: 'Advanced workflow automation system combining MEAN stack with Google Gemini AI to intelligently process, summarize, and route enterprise system requests.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
    tags: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Gemini AI'],
    github: 'https://github.com/anandjadhav/ProFlow',
    live: 'https://proflow.example.com',
  },
  {
    id: 2,
    title: 'Inventory Pro SAPUI5',
    description: 'Modern, fully responsive warehouse and inventory manager developed using SAPUI5, deployed on SAP Business Technology Platform (BTP), consuming ABAP OData Services.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=300&fit=crop',
    tags: ['SAPUI5', 'SAP BTP', 'ABAP Cloud', 'OData', 'Fiori'],
    github: 'https://github.com/anandjadhav/InventoryPro',
    live: 'https://inventorypro.example.com',
  },
  {
    id: 3,
    title: 'Deepfake Detection AI',
    description: 'Flask-based service powered by deep CNN TensorFlow models capable of detecting real-time facial manipulation and synthetic vocal/audio overrides.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=300&fit=crop',
    tags: ['TensorFlow', 'Python', 'Flask', 'Computer Vision'],
    github: 'https://github.com/anandjadhav/DeepfakeDetection',
    live: 'https://deepfake.example.com',
  },
  {
    id: 4,
    title: 'iOS Weather & Tasks App',
    description: 'Clean native iOS productivity app created in Swift and SwiftUI, utilizing the Combine framework to stream open-source weather updates, featuring offline CoreData cache.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&h=300&fit=crop',
    tags: ['Swift', 'SwiftUI', 'CoreData', 'Combine', 'REST API'],
    github: 'https://github.com/anandjadhav/iOS-Weather-Todo',
    live: 'https://ios-weather.example.com',
  },
]

export const certifications = [
  {
    id: 1,
    name: 'Java (Basic)',
    issuer: 'HackerRank',
    date: 'May 2026',
    credentialId: '221b21c250dc',
    credentialUrl: 'https://www.hackerrank.com/certificates/221b21c250dc',
    skills: ['Java', 'Object-Oriented Programming (OOP)', 'Data Structures'],
  },
  {
    id: 2,
    name: 'Frontend Developer (React)',
    issuer: 'HackerRank Campus Club, AUFS',
    date: 'Aug 2025',
    credentialId: 'D9D625DC257D',
    credentialUrl: 'https://www.hackerrank.com/certificates/d9d625dc257d',
    skills: ['React.js', 'Front-End Development', 'JavaScript', 'HTML', 'CSS', 'Web Development'],
  },
  {
    id: 3,
    name: 'SAP Certified Associate - Back-End Developer - ABAP Cloud',
    issuer: 'SAP',
    date: 'Jul 2025',
    expiry: 'Jul 2026',
    credentialUrl: 'https://www.credly.com/badges/99fc1274-a818-4ca7-8f0c-a1160e29a2d9',
    skills: ['ABAP', 'BTP', 'OData', 'SAP Fiori', 'Object-Oriented Programming (OOP)', 'DBMS', 'SAP HANA', 'RAP'],
  },
  {
    id: 4,
    name: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialId: '5BE0C46B5690',
    credentialUrl: 'https://www.hackerrank.com/certificates/5BE0C46B5690',
    skills: ['SQL', 'Database Management'],
  },
  {
    id: 5,
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialId: '6EA0995547BD',
    credentialUrl: 'https://www.hackerrank.com/certificates/6EA0995547BD',
    skills: ['SQL', 'Database Management'],
  },
  {
    id: 6,
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Sep 2025',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=936D3B09FF91E2F3CD05BB488DB2D49679D6D917C54313C9B9941AB15A548553',
    skills: ['Java', 'OOP', 'Data Structures', 'AI', 'Cloud'],
  },
  {
    id: 7,
    name: 'Electronic Arts - Software Engineering Job Simulation',
    issuer: 'Forage',
    date: 'Jul 2025',
    credentialId: 'TpjjDh3DyagxGNJo4',
    credentialUrl: 'https://www.theforage.com/',
    skills: ['Software Engineering', 'Problem Solving', 'Team Simulation'],
  },
];

export const linkedinPost = {
  title: 'How I built a LinkedIn-ready SAP BTP + MEAN stack automation workflow',
  date: 'May 2026',
  excerpt: 'Sharing my latest campus project: an end-to-end enterprise automation pipeline using SAP BTP, Angular, Node.js, and a custom REST AI integration. Check the post for architecture diagrams and deployment insights.',
  url: 'https://www.linkedin.com/in/anand-jadhav-b599801b5/',
}

export const experience = [
  {
    id: 1,
    title: 'Enterprise Software Intern',
    company: 'SAP UI5 / Cloud Development',
    duration: '2024',
    description: 'Constructed custom business logic UI panels in SAP Fiori & SAPUI5. Configured cloud connector and OData integration on SAP Business Technology Platform (BTP).',
    type: 'internship',
  },
  {
    id: 2,
    title: 'Freelance Full Stack / iOS Developer',
    company: 'Self-Employed',
    duration: '2022 - Present',
    description: 'Crafted 4+ React and Angular web utilities and SwiftUI native prototypes. Engineered deep learning facial analysis Flask endpoints.',
    type: 'freelance',
  },
]

export const stats = {
  projectsCompleted: 4,
  certifications: 7,
  githubContributions: 620,
}
