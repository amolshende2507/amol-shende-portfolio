// FILE: client/src/components/Experience.tsx

import { useRef } from 'react';
import { Briefcase, Users, Code, Trophy, GitBranch } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experiences } from '../data/portfolioData'; // This line imports your data

const iconMap = {
  briefcase: Briefcase,
  users: Users,
  code: Code,
  trophy: Trophy,
  'git-branch': GitBranch,
};

export const Experience = () => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(ref);

  return (
    <section id="experience" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* The rest of your JSX code for the component... */}
      <div className="max-w-5xl mx-auto relative z-10">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Experience & Achievements
          </span>
        </h2>
        {/* ... etc ... */}
        <div className="relative">
          {experiences.map((exp, index) => { // This line uses the 'experiences' data
            const IconComponent = iconMap[exp.icon as keyof typeof iconMap] || Briefcase;
            return (
              <div key={exp.id}>
                {/* ... The rest of your map logic ... */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};