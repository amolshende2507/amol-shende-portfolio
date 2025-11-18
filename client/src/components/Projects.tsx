

// 1. IMPORT necessary hooks and libraries
import { useState, useEffect, useRef } from 'react';
import API from '../api/axios'; // Import axios for API calls
import { ExternalLink, Github, Filter, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
// We are no longer importing from portfolioData, so we can remove it.
import type { Project } from '../types/portfolio';// Import our updated Project type

export const Projects = () => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(ref);

  // 2. STATE MANAGEMENT hooks
  const [allProjects, setAllProjects] = useState<Project[]>([]); // To store all projects from API
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // To store projects to be displayed
  const [categories, setCategories] = useState<string[]>(['All']); // To store unique categories
  const [activeFilter, setActiveFilter] = useState<string>('All'); // To track the active filter
  const [loading, setLoading] = useState<boolean>(true); // To show a loading state
  const [error, setError] = useState<string | null>(null); // To show an error state

  // 3. DATA FETCHING with useEffect
  // This hook runs once when the component first mounts.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make a GET request to our backend API endpoint
        const response = await API.get('/api/projects');
        const projectsData: Project[] = response.data;

        // Store the fetched data
        setAllProjects(projectsData);
        setFilteredProjects(projectsData);

        // Dynamically create the category filters from the project data
        const uniqueCategories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];
        setCategories(uniqueCategories);

      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        // Set loading to false whether it succeeded or failed
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // The empty dependency array [] means this effect runs only once.

  // 4. FILTERING LOGIC
  // This function runs whenever a filter button is clicked.
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(p => p.category === category);
      setFilteredProjects(filtered);
    }
  };

  // 5. RENDER LOGIC with conditional rendering
  return (
    <section id="projects" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* ... The background divs are the same ... */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ... The h2 and p tags are the same ... */}
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <p
          className={`text-center text-slate-400 text-lg mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Some of my recent work
        </p>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Filter className="w-5 h-5 text-cyan-400 self-center mr-2" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-800/50 backdrop-blur-sm text-slate-300 border border-slate-700 hover:border-cyan-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Conditional Rendering for Loading and Error states */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            <p className="ml-4 text-xl text-slate-300">Loading Projects...</p>
          </div>
        )}
        {error && (
           <div className="text-center h-40 text-red-400 text-xl bg-red-500/10 p-8 rounded-lg">
            {error}
           </div>
        )}

        {/* Project Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                // Use project._id from MongoDB for a stable key
                key={project._id}
                className={`group relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                {/* ... The rest of the card JSX is exactly the same ... */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                <div className="relative h-full bg-slate-800/90 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700 group-hover:border-transparent transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-bold">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-xs rounded-lg border border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg border border-slate-600">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-700">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                          <span className="text-sm font-semibold">Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span className="text-sm font-semibold">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};