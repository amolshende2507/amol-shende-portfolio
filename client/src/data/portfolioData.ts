import type {  Experience, Skill } from '../types/portfolio';



export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full-Stack Development Intern',
    organization: 'Tech Startup Inc.',
    period: 'Jun 2024 - Aug 2024',
    description: 'Developed RESTful APIs and React components for a SaaS platform. Improved application performance by 40%.',
    icon: 'briefcase'
  },
  {
    id: '2',
    title: 'Technical Lead',
    organization: 'University Tech Club',
    period: '2023 - 2024',
    description: 'Led a team of 15 developers in building web applications for campus events and hackathons.',
    icon: 'users'
  },
  {
    id: '3',
    title: 'Freelance Web Developer',
    organization: 'Self-Employed',
    period: '2023 - Present',
    description: 'Delivered 12+ projects for clients including e-commerce sites, portfolios, and business websites.',
    icon: 'code'
  },
  {
    id: '4',
    title: 'Hackathon Winner',
    organization: 'Smart India Hackathon',
    period: 'Mar 2024',
    description: 'First place in national-level hackathon for developing an AI-powered educational platform.',
    icon: 'trophy'
  },
  {
    id: '5',
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    period: '2023 - Present',
    description: 'Active contributor to React, Node.js, and TypeScript open source projects with 50+ merged PRs.',
    icon: 'git-branch'
  }
];

export const skills: Skill[] = [
  // 🌐 Frontend
  { name: 'React', category: 'frontend', level: 85 },
  { name: 'TypeScript', category: 'frontend', level: 80 },
  { name: 'Next.js', category: 'frontend', level: 70 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 90 },
  { name: 'HTML/CSS', category: 'frontend', level: 94 },


  // ⚙️ Backend
  { name: 'Node.js', category: 'backend', level: 85 },
  { name: 'Express.js', category: 'backend', level: 83 },
  { name: 'MongoDB', category: 'backend', level: 82 },
  { name: 'REST APIs', category: 'backend', level: 90 },

  // 🧰 Tools & DevOps
  { name: 'Git & GitHub', category: 'tools', level: 92 },
  { name: 'Postman', category: 'tools', level: 88 },
  { name: 'Vercel / Netlify', category: 'tools', level: 70 },
  { name: 'VS Code', category: 'tools', level: 95 },

  // 🔒 Other / Additional
  { name: 'JWT Authentication', category: 'other', level: 87 },
  { name: 'UI/UX Design Principles', category: 'other', level: 88 },
];

