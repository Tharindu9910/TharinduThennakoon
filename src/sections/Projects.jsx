import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { ExternalLink,ArrowUpRight, Github , ChevronLeft, ChevronRight, Zap, Shield, Globe, Code } from 'lucide-react';
import ProjectBlock from "./projects/ProjectBlock";

const projects = [
  {
    title: "Epitoni",
    description:
      "AI-powered SaaS platform where businesses publish, manage, and personalize promotional content.",
    image: "/projects/project1.png",
    tags: ["React", "Typescript", "Python", "Flask", "Neo4j", "GCP", "Docker", "Firebase"],
    link: "#",
    github: "#",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    image: "/projects/project2.png",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Writing Assistant",
    description:
      "An intelligent writing tool powered by GPT-4, helping users create better content faster.",
    image: "/projects/project3.png",
    tags: ["React", "OpenAI", "Python", "FastAPI"],
    link: "#",
    github: "#",
  },
  {
    title: "Project Management Tool",
    description:
      "A collaborative workspace for teams with real-time updates, task tracking, and integrations.",
    image: "/projects/project4.png",
    tags: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    link: "#",
    github: "#",
  },
];

const myProjects = [
  {
    title : "AI-Powered Promotions & Customer Engagement SaaS",
    tagline : "Personalized deals for users. Actionable insights for businesses.",
    description : "Epitoni is an promotions and customer engagement SaaS platform that connects users with personalized deals while providing businesses with actionable analytics and engagement tools. \nDeveloped using Flask microservices on GCP, secure JWT-based auth, Firestore + Neo4j data modeling, real-time notifications, and React-based analytical dashboards with responsive UIs.",
    screenshots: [
      "/projects/login.png",
      "/projects/home.png",
      "/projects/businessList.png",
      "/projects/businessInfo.png",
      "/projects/edit.png",
      "/projects/dashboard1.png",
      "/projects/dashboard2.png",
      "/projects/tag.png",
      "/projects/followers.jpg",
      "/projects/getNotifiedAction.jpg",
      "/projects/notificationLog.jpg",
      "/projects/api1.png",
      "/projects/api2.jpg",
      "/projects/api3.png",
      "/projects/api4.jpg"
    ],
    technologies : [
      { name: "React", category: "Frontend" },
      { name: "Flask", category: "Backend" },
      { name: "Microservices", category: "Architecture" },
      { name: "Neo4j", category: "Database" },
      { name: "GCP", category: "Cloud" },
      { name: "Firebase", category: "Tools" },
      { name: "OAuth2.0", category: "Security" }
    ],
    // highlights : [
    //   { icon: Zap, title: "Real-time Personalization", desc: "AI-driven content adaptation based on user behavior" },
    //   { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption" },
    //   { icon: Globe, title: "Multi-channel Publishing", desc: "Deploy to web, mobile, and social platforms" },
    //   { icon: Code, title: "Developer API", desc: "RESTful API with comprehensive documentation" }
    // ],
    metrics : [
      { label: "Active Users", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "API Calls/Day", value: "2M+" }
    ],
    githubUrl : "",
    liveUrl : "https://promo.epitoni.com",
  }
  ,
  {
    title : "Neo-Ji - Cloud-Native Real-Time AI Agent",
    tagline : "Conversational AI with task execution and multi-channel delivery.",
    description : "Neo-Ji is a cloud-native AI agent system that allows users to chat with an intelligent assistant in real time to retrieve information and execute actions such as bookings, reservations, and orders. \nThe platform implements WebSocket-based messaging on Google Cloud Run, extends conversations to WhatsApp using Meta APIs and webhooks, and includes a hosted embeddable chat widget for external integration. \nTo ensure scalability and responsiveness, the system uses Google Cloud Tasks for message queuing, optimized Firestore operations, and performance tuning that reduced end-to-end message processing.",
    screenshots: [
      "/projects/widget/w2.jpg",
      "/projects/widget/w1.jpg"
    ],
    technologies : [
      { name: "React", category: "Frontend" },
      { name: "FastAPI", category: "Backend" },
      { name: "Microservices", category: "Architecture" },
      { name: "Redis", category: "Cache" },
      { name: "GCP", category: "Cloud" },
      { name: "Docker", category: "Tools" },
      { name: "OAuth2.0", category: "Security" }
    ],
    // highlights : [
    //   { icon: Zap, title: "Real-time Personalization", desc: "AI-driven content adaptation based on user behavior" },
    //   { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption" },
    //   { icon: Globe, title: "Multi-channel Publishing", desc: "Deploy to web, mobile, and social platforms" },
    //   { icon: Code, title: "Developer API", desc: "RESTful API with comprehensive documentation" }
    // ],
    metrics : [
      { label: "Active Users", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "API Calls/Day", value: "2M+" }
    ],
    githubUrl : "",
    liveUrl : "https://neo-ji-info.web.app/neo-ji-xenia",
  },
  {
    title : "MQTT-Based Secure Chat Platform",
    tagline : "Low-latency messaging with security, scalability, and team leadership.",
    description : "A real-time messaging backend built on MQTT (Mosquitto) to support low-latency, scalable chat communication. \nLed the application development and guided a small engineering team, defining system architecture, security standards, and development workflows. The system uses Mosquitto deployed on Google Compute Engine, with a Cloud Run–based microservice for message publishing, topic management, and API-driven interactions. \nImplemented token-based Firebase Authentication for secure client–broker communication and end-to-end encryption using hybrid cryptography (public–private key exchange combined with symmetric encryption) to ensure message confidentiality and user privacy.",
    screenshots: [
      "/projects/chat/chatss.jpg"
    ],
    technologies : [
      { name: "FastAPI", category: "Backend" },
      { name: "Flask", category: "Backend" },
      { name: "GCP", category: "Cloud" },
      { name: "Ubuntu Server", category: "service" },
      { name: "Docker", category: "Tools" },
      { name: "Cryptography", category: "Security" }
    ],
    // highlights : [
    //   { icon: Zap, title: "Real-time Personalization", desc: "AI-driven content adaptation based on user behavior" },
    //   { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption" },
    //   { icon: Globe, title: "Multi-channel Publishing", desc: "Deploy to web, mobile, and social platforms" },
    //   { icon: Code, title: "Developer API", desc: "RESTful API with comprehensive documentation" }
    // ],
    githubUrl : "",
    liveUrl : "",
  },
  {
    title : "Lyric-Loom Music Player Mobile App",
    tagline : "",
    description : "Developed a cross-platform music player using Flutter and Firebase, integrating Spotify and Deezer REST APIs for real-time streaming. Implemented clean architecture, user authentication, profile management, and a responsive UI for a scalable and maintainable mobile application.",
    screenshots: [
      "/projects/music/ss.png"
    ],
    technologies : [
      { name: "Flutter", category: "Frontend" },
      { name: "Dart", category: "Frontend" },
      { name: "MobX", category: "State" },
      { name: "Firebase", category: "Backend" },
    ],
    // highlights : [
    //   { icon: Zap, title: "Real-time Personalization", desc: "AI-driven content adaptation based on user behavior" },
    //   { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption" },
    //   { icon: Globe, title: "Multi-channel Publishing", desc: "Deploy to web, mobile, and social platforms" },
    //   { icon: Code, title: "Developer API", desc: "RESTful API with comprehensive documentation" }
    // ],
    githubUrl : "https://github.com/Tharindu9910/MusicPlayer.git",
    liveUrl : "",
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web/mobile applications to
            innovative tools that solve real-world problems.
          </p>
        </div>
        {myProjects.map((project, idx) => (
            <ProjectBlock key={idx} {...project} />
          ))}
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
        
          {/* {projects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
       
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
        
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 
                  text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 
                   group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))} */}
        </div>

        {/* View All CTA */}
        {/* <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton>
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div> */}
      </div>
    </section>
  );
};
