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
  { name: 'React', category: 'frontend', level: 95 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'Next.js', category: 'frontend', level: 85 },
  { name: 'Tailwind CSS', category: 'frontend', level: 95 },
  { name: 'JavaScript', category: 'frontend', level: 95 },
  { name: 'HTML/CSS', category: 'frontend', level: 98 },
  { name: 'Node.js', category: 'backend', level: 90 },
  { name: 'Express', category: 'backend', level: 88 },
  { name: 'MongoDB', category: 'backend', level: 85 },
  { name: 'PostgreSQL', category: 'backend', level: 80 },
  { name: 'REST APIs', category: 'backend', level: 92 },
  { name: 'GraphQL', category: 'backend', level: 75 },
  { name: 'Git', category: 'tools', level: 90 },
  { name: 'Docker', category: 'tools', level: 75 },
  { name: 'AWS', category: 'tools', level: 70 },
  { name: 'Redis', category: 'tools', level: 72 },
  { name: 'Socket.io', category: 'other', level: 85 },
  { name: 'JWT', category: 'other', level: 88 }
];
