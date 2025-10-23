// In client/src/components/Experience.tsx
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Briefcase, Users, Code, Trophy, GitBranch } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { Experience as ExperienceType } from '../types/portfolio';

// We need this map to convert the icon string from the DB to a renderable component
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
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/experiences');
        setExperiences(response.data);
      } catch (error) {
        console.error("Failed to fetch experiences", error);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-24 px-6 ...">
      {/* ... heading ... */}
      <div className="relative">
        <div className="absolute left-8 md:left-1/2 ... w-0.5 bg-gradient-to-b ..." />

        {experiences.map((exp, index) => {
          const IconComponent = iconMap[exp.icon as keyof typeof iconMap] || Briefcase;
          const isEven = index % 2 === 0;

          return (
            <div key={exp._id} className={`relative mb-16 ...`}>
              {/* ... The rest of your existing JSX for rendering the timeline item ... */}
              {/* Just make sure you are using 'exp.title', 'exp.organization', etc. */}
              <IconComponent className="w-8 h-8 text-cyan-400" />
            </div>
          );
        })}
      </div>
    </section>
  );
};