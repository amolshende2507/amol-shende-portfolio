import { useRef } from 'react';
import { Code2, Zap, Heart, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const badges = [
  { icon: Code2, text: 'Clean Code', color: 'from-cyan-400 to-blue-500' },
  { icon: Zap, text: 'Fast Performance', color: 'from-blue-400 to-purple-500' },
  { icon: Heart, text: 'User-Centric', color: 'from-purple-400 to-pink-500' },
  { icon: Target, text: 'Goal-Oriented', color: 'from-pink-400 to-red-500' },
];

export const About = () => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(ref);

  return (
    <section id="about" ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-cyan-400/30">
                <img
                  src="amol.jpg"
                  alt="Amol Shende"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>
                Hi! I'm <span className="text-cyan-400 font-semibold">Amol Shende</span>, a passionate
                full-stack developer who loves building things that live on the internet. My journey in web
                development started during my university years, and I haven't looked back since.
              </p>
              <p>
                I specialize in creating exceptional digital experiences that are not only visually appealing
                but also highly functional and user-friendly. Whether it's a complex web application or a
                simple landing page, I bring the same level of dedication and attention to detail.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                or mentoring aspiring developers. I believe in continuous learning and staying ahead of the
                curve in this ever-evolving tech landscape.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`group p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] ${isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${badge.color} bg-opacity-20`}>
                      <badge.icon className={`w-6 h-6 bg-gradient-to-br ${badge.color} bg-clip-text text-transparent`} style={{ filter: 'brightness(1.5)' }} />
                    </div>
                    <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {badge.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
