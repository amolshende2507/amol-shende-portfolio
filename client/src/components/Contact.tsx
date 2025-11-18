import { useState, useRef, type FormEvent } from 'react';
import { Mail, Send, Github, Linkedin,Instagram, CheckCircle, XCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(ref);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submission triggered!'); // You should see this line.
    setStatus('sending');

    try {
      console.log('Attempting to send fetch request to backend...'); // New log line

      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Fetch request completed. Response received:', response); // New log line

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      // THIS IS THE MOST IMPORTANT PART
      console.error('!!! FETCH ERROR OCCURRED !!!'); // New log line
      console.error(error); // This will print the exact error object
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/test')
  //     .then(res => res.json())
  //     .then(data => console.log('MESSAGE FROM BACKEND:', data.message))
  //     .catch(err => console.error('Error fetching from backend:', err));
  // }, []);

  return (
    <section id="contact" ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p
          className={`text-center text-slate-400 text-lg mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          Let's create something amazing together
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-200 mb-6">Let's talk about your project</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                I'm always interested in hearing about new projects and opportunities. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=amolshende2507@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-slate-200 font-semibold group-hover:text-cyan-400 transition-colors">
                      amolshende2507@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="text-slate-200 font-semibold">+91 7744991250</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                {[
                  { Icon: Github, href: 'https://github.com/amolshende2507', color: 'hover:text-purple-400' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/amol-shende-9b5448291/', color: 'hover:text-blue-400' },
                  { Icon: Instagram, href: 'https://www.instagram.com/its_amol_2525?igsh=NDAxOWNldnF2MHp5', color: 'hover:text-pink-400' },
                ].map(({ Icon, href, color }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 ${color} hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>

            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden">
                  <textarea
                    required
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' && (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                )}
                {status === 'error' && (
                  <>
                    <XCircle className="w-5 h-5" />
                    Failed. Try Again
                  </>
                )}
                {status === 'idle' && (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
