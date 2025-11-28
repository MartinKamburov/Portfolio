import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2 } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SMOOTH SCROLL FUNCTION ---
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "https://medium.com/@martin.kamburov", external: true },
    { name: "Contact", href: "#contact" },
  ];

  const skills = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Tailwind', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Postgres', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'Selenium', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
  ];

  return (
    <div className="min-h-screen text-slate-800 selection:bg-primary selection:text-white">
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className={`text-2xl font-bold tracking-tight cursor-pointer ${isScrolled ? 'text-slate-900' : 'text-white'}`}
          >
            Dev<span className="text-primary">.</span>Portfolio
          </a>
          <ul className="hidden md:flex space-x-8 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={(e) => !link.external && handleSmoothScroll(e, link.href)}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`hover:text-primary transition-colors cursor-pointer ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}
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

      {/* --- HERO SECTION (Updated Background) --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-dark">
        
        {/* --- Ambient Blue Background Effects --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Top Right - Large Blue/Purple */}
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
           
           {/* Bottom Left - Indigo/Dark Blue */}
           <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px] opacity-50"></div>
           
           {/* Center Left - Cyan/Light Blue splash */}
           <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[60px] opacity-40"></div>
           
           {/* Center Right - Primary Blue splash */}
           <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[70px] opacity-40"></div>
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
               <a 
                 href="#projects" 
                 onClick={(e) => handleSmoothScroll(e, '#projects')}
                 className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 cursor-pointer"
               >
                View My Work
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all border border-white/10 cursor-pointer"
              >
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
              description="Applyo is a browser extension/dashboard that helps you stay organized during your job hunt."
              tags={['React', 'Next.js', 'PostgreSQL', 'Tailwind', 'TypeScript']}
              imageUrl="/ApplyoPic.jpg"
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
              title="Real-Estate Listing Automation" 
              description="This project scrapes house listings and auto posts them to Facebook Marketplace."
              tags={['Python', 'Selenium']}
              imageUrl="/RealEstateListingsScraper.png"
              projectUrl="https://drive.google.com/file/d/1VF8CzEENIybL2tO_NoWT8nTHMQlKwUWr/view?usp=sharing"
            />
            <ProjectCard 
              title="JWT-Auth-Project" 
              description="A concise full‑stack starter pack protected by stateless JWT authentication."
              tags={['Spring Boot', 'React', 'PostgreSQL', 'TypeScript']}
              imageUrl="/JwtAuthenticationProject.png"
              projectUrl="https://github.com/MartinKamburov/JWT-Auth-Project"
            />
            <ProjectCard 
              title="Privy Tune" 
              description="An offline WebGPU powered AI Chatbot, download an LLM completely in the browser."
              tags={['React', 'Typescript', 'Tailwind']}
              imageUrl="/PrivyTunePic.png"
              projectUrl="https://privytune.vercel.app/"
            />
            <ProjectCard 
              title="Stock Predictor" 
              description="This project predicts any stock that you choose using an LSTM RNN"
              tags={['Python', 'Tensorflow', 'Pandas', 'Numpy']}
              imageUrl="/StockMarketPic.jpg"
              projectUrl="https://github.com/MartinKamburov/StockPredictor"
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-slate-300 mb-8 text-lg">Currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is open!</p>
          <a href="mailto:martinivkamburov@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-semibold rounded-full transition-all">
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
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all z-10"></div>
        <img src={imageUrl} alt={title} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" />
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