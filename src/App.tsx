import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2 } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // --- TRAIL ANIMATION SETUP ---
  const trailLength = 20; 
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Track if we have found the mouse yet so we don't start at 0,0
  const isFirstMove = useRef(true); 

  // We initiate coordinates to null or 0, but the 'isFirstMove' flag handles the logic
  const mouseCoords = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(Array(trailLength).fill({ x: 0, y: 0 }));

  if (trailRefs.current.length !== trailLength) {
    trailRefs.current = Array(trailLength).fill(null);
  }

  useEffect(() => {
    let animationFrameId: number;

    const animateTrail = () => {
      const positions = trailPositions.current;
      const mouse = mouseCoords.current;

      // 1. Move Head
      positions[0] = mouse;

      // 2. Move Body
      for (let i = 1; i < trailLength; i++) {
        const leader = positions[i - 1];
        const follower = positions[i];
        
        positions[i] = {
          x: follower.x + (leader.x - follower.x) * 0.2,
          y: follower.y + (leader.y - follower.y) * 0.2,
        };
      }

      // 3. Check if stopped (for fading)
      const head = positions[0];
      const tail = positions[trailLength - 1];
      const distance = Math.hypot(head.x - tail.x, head.y - tail.y);
      const isMoving = distance > 0.5;

      // 4. Update DOM
      trailRefs.current.forEach((ref, index) => {
        if (ref) {
          const { x, y } = positions[index];
          
          ref.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          
          const indexRatio = index / (trailLength - 1);
          const baseOpacity = 0.6 * (1 - indexRatio); 
          
          // If it's the very first frame (before mouse move), hide everything
          // Otherwise, use the movement logic
          if (isFirstMove.current) {
             ref.style.opacity = '0';
          } else {
             ref.style.opacity = isMoving ? baseOpacity.toString() : '0';
          }
          
          const scale = 1 - (indexRatio * 0.5);
          ref.style.scale = scale.toString();
        }
      });

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animateTrail();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Update mouse ref on move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // FIX: On the very first move, snap the entire trail to the cursor
      // This prevents it from trailing in from the top-left (0,0)
      if (isFirstMove.current) {
        isFirstMove.current = false;
        // Fill the entire array with the current position so there is no "lag" at start
        trailPositions.current.fill({ x, y });
      }

      mouseCoords.current = { x, y };
  };
  // --- END TRAIL ANIMATION SETUP ---

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "https://your-blog-url.com", external: true },
    { name: "Contact", href: "#contact" },
  ];

  const skills = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { name: 'Selenium', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Postgres', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  ];

  return (
    <div className="min-h-screen text-slate-800 selection:bg-primary selection:text-white">
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Dev<span className="text-primary">.</span>Portfolio
          </a>
          <ul className="hidden md:flex space-x-8 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`hover:text-primary transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
           <div className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
             <Code2 size={24} />
           </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-dark group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
           mouseCoords.current = { x: -1000, y: -1000 };
           // We reset first move so if they come back it snaps again instead of flying
           // Optional, but feels nicer
           // isFirstMove.current = true; 
        }}
      >
        {/* TRAIL ELEMENTS */}
        {Array.from({ length: trailLength }).map((_, index) => (
          <div
            key={index}
            ref={el => (trailRefs.current[index] = el)}
            // Important: transition-opacity for smooth fade out, but NO transition on transform
            className="absolute top-0 left-0 w-8 h-8 bg-blue-400 rounded-full blur-xl pointer-events-none transition-opacity duration-300 will-change-transform mix-blend-screen"
            style={{
               opacity: 0, 
               transform: 'translate(-50%, -50%)' 
             }}
          />
        ))}

        {/* Static Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-center">
              <img 
                src="/MartinKamburovPic.JPEG" 
                alt="Profile" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/30 shadow-2xl object-cover relative z-10"
              />
            </div>

            <p className="text-blue-300 font-medium tracking-wide uppercase">Hello, I'm a</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed relative z-10">
              I love building things that serve a purpose and make people's lives easier, from tools to full-stack web apps.
            </p>
            
            <div className="flex justify-center gap-4 pt-6 relative z-10">
               <a href="#projects" className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all border border-white/10">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT & SKILLS --- */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* About Me */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
                <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                  <p>
                    I'm a passionate developer who recently graduated from <strong>Toronto Metropolitan University</strong> with a degree in Computer Science. 
                  </p>
                  <p>
                    My focus is on creating intuitive user experiences supported by robust backend architecture. I love learning new technologies and applying them to solve real-world challenges.
                  </p>
                  <p>
                    When I'm not coding, you can find me playing basketball, lifting weights, or creating the most random applications.
                  </p>
                </div>
              </div>
              
              <div>
                 <h3 className="text-lg font-semibold text-slate-900 mb-4">Connect with me</h3>
                 <div className="flex gap-4">
                  <SocialLink href="https://github.com/MartinKamburov" icon={<Github size={20} />} label="GitHub" />
                  <SocialLink href="https://www.linkedin.com/in/martin-kamburov-a906b325b/" icon={<Linkedin size={20} />} label="LinkedIn" />
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center md:text-left">
                Technical <span className="text-primary">Toolbox</span>
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {skills.map(skill => (
                  <SkillItem key={skill.name} name={skill.name} logo={skill.logo} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
           <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Portfolio Work</h2>
            <p className="text-slate-600 max-w-xl mx-auto">A selection of my recent work, ranging from web applications and backend services to freelance work that I have done.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="ApplyO" 
              description="Applyo is a lightweight browser extension and web dashboard that helps you stay organized throughout your job hunt."
              tags={['React', 'Next.js', 'PostgreSQL', 'Tailwind']}
              imageUrl="/ApplyoPic.png"
              projectUrl="https://github.com/MartinKamburov/ApplyO"
            />
            <ProjectCard 
              title="NBA Stat Finder" 
              description="A website to view the stats of all NBA players in the 2024-2025 season."
              tags={['Spring Boot', 'React', 'PostgreSQL', 'Tailwind']}
              imageUrl="/PictureOfNbaStatFinderProject.png"
              projectUrl="https://github.com/MartinKamburov/NBA-Stat-Finder"
            />
             <ProjectCard 
              title="Privy Tune" 
              description="An offline WebGPU powered AI Chatbot, download a lightweight LLM completely in the browser."
              tags={['React', 'Vite', 'Tailwind v4']}
              imageUrl="https://privytune.vercel.app/"
              projectUrl="https://privytune.vercel.app/"
            />
             <ProjectCard 
              title="Developer Portfolio" 
              description="This very website! Built for performance and clean aesthetics."
              tags={['React', 'Vite', 'Tailwind v4']}
              imageUrl="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              projectUrl="#"
            />
             <ProjectCard 
              title="Developer Portfolio" 
              description="This very website! Built for performance and clean aesthetics."
              tags={['React', 'Vite', 'Tailwind v4']}
              imageUrl="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              projectUrl="#"
            />
             <ProjectCard 
              title="Developer Portfolio" 
              description="This very website! Built for performance and clean aesthetics."
              tags={['React', 'Vite', 'Tailwind v4']}
              imageUrl="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              projectUrl="#"
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-slate-300 mb-8 text-lg">Currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is open!</p>
          <a href="mailto:your.email@example.com" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-semibold rounded-full transition-all">
            <Mail size={20} /> Say Hello
          </a>
        </div>
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="py-8 bg-dark border-t border-white/10 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Martin Kamburov. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  )
}

// --- Subcomponents ---

function SkillItem({ name, logo }: { name: string, logo: string }) {
  return (
    <div className="group flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-default aspect-square">
      <img src={logo} alt={name} className="w-8 h-8 sm:w-10 sm:h-10 mb-2 group-hover:scale-110 transition-transform drop-shadow-sm" />
      <span className="text-slate-600 font-medium text-[10px] sm:text-xs text-center leading-tight">{name}</span>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-primary hover:text-white transition-all">
      {icon}
    </a>
  )
}

function ProjectCard({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  projectUrl 
}: { 
  title: string, 
  description: string, 
  tags: string[], 
  imageUrl: string, 
  projectUrl: string 
}) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all z-10"></div>
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <a 
          href={projectUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-700"
        >
          View Project <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}

export default App;