import { useState, useEffect } from 'react';
import { Code, Database, Globe, Cpu, Download, Mail } from 'lucide-react';

const FloatingIcon = ({ Icon, delay, position }: { Icon: any; delay: number; position: string }) => (
  <div
    className={`absolute ${position} animate-float`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300">
      <Icon className="w-8 h-8 text-cyan-400" />
    </div>
  </div>
);

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.15), transparent 25%)`,
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <FloatingIcon Icon={Code} delay={0} position="top-20 left-10 lg:left-20" />
      <FloatingIcon Icon={Database} delay={0.5} position="top-40 right-10 lg:right-32" />
      <FloatingIcon Icon={Globe} delay={1} position="bottom-32 left-16 lg:left-40" />
      <FloatingIcon Icon={Cpu} delay={1.5} position="bottom-20 right-20 lg:right-48" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Amol Shende
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-slate-200">
            Full-Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting seamless digital experiences with modern web technologies.
            <br />
            Specializing in <span className="text-cyan-400 font-semibold">MERN Stack</span>,{' '}
            <span className="text-blue-400 font-semibold">TypeScript</span>, and{' '}
            <span className="text-purple-400 font-semibold">Cloud Solutions</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              View My Work
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 bg-slate-800/50 backdrop-blur-md border-2 border-cyan-400/50 rounded-full font-semibold text-lg hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 flex items-center gap-2 animate-pulse-slow"
            >
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};
