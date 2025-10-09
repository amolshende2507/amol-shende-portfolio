import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skills } from '../data/portfolioData';

const categoryColors = {
  frontend: 'from-cyan-400 to-blue-500',
  backend: 'from-blue-500 to-purple-500',
  tools: 'from-purple-500 to-pink-500',
  other: 'from-pink-500 to-red-500',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'DevOps & Tools',
  other: 'Other Technologies',
};

export const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(ref);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>
        <p
          className={`text-center text-slate-400 text-lg mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Technologies I work with
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <div
              key={category}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${400 + categoryIndex * 200}ms` }}
            >
              <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 border border-slate-700 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-slate-200">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`group relative ${
                        isVisible ? 'animate-scale-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${600 + categoryIndex * 200 + index * 50}ms` }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${
                          categoryColors[category as keyof typeof categoryColors]
                        } rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                      />
                      <div
                        className={`relative px-5 py-3 bg-slate-800/80 backdrop-blur-sm rounded-xl border-2 border-slate-700 group-hover:border-transparent transition-all duration-300 cursor-default`}
                      >
                        <span
                          className={`font-semibold text-slate-200 group-hover:bg-gradient-to-r ${
                            categoryColors[category as keyof typeof categoryColors]
                          } group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                        >
                          {skill.name}
                        </span>
                        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 px-3 py-1 rounded-lg border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        <span className="text-sm text-cyan-400 font-semibold">Proficiency: {skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
