import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { ExternalLink,ArrowUpRight, Github , ChevronLeft, ChevronRight, Zap, Shield, Globe, Code } from 'lucide-react';
import ProjectBlock from "./projects/ProjectBlock";
import { api1, api2, api3, api4, businessInfo, businessList, chatss, dashboard1, dashboard2, edit, followers, getNotifiedAction, home, login, notificationLog, ss, tag, w1, w2 } from "../assets/images";
import React, { Suspense } from 'react';

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
      login,
      home,
      businessList,
      businessInfo,
      edit,
      dashboard1,
      dashboard2,
      tag,
      followers,
      getNotifiedAction,
      notificationLog,
      api1,
      api2,
      api3,
      api4
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
      w2,
      w1
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
      chatss
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
      ss
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

const MyComponent = React.lazy(() => import('./projects/ProjectBlock'));

const ProjectSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto mb-10 sm:mb-16 rounded-2xl border border-white/10 overflow-hidden animate-pulse">
    <div className="flex flex-col md:grid md:grid-cols-2">
      <div className="h-48 sm:h-64 md:h-auto bg-white/5 m-4 sm:m-6 md:m-8 rounded-xl" />
      <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4">
        <div className="h-8 bg-white/5 rounded-lg w-2/3" />
        <div className="h-4 bg-white/5 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-5/6" />
          <div className="h-3 bg-white/5 rounded w-4/6" />
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-white/5 rounded-full" />
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="h-10 flex-1 bg-white/5 rounded-xl" />
          <div className="h-10 w-24 bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

export const Projects = () => {
  return (
    <section id="projects" className="pt-10 sm:pt-14 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mx-auto max-w-3xl mb-10 sm:mb-16">
          <span className="text-secondary-foreground text-xs sm:text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}make an impact.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground animate-fade-in animation-delay-200 px-2 sm:px-0">
            A selection of my recent work, from complex web/mobile applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Project list */}
        {myProjects.map((project, idx) => (
          <Suspense key={idx} fallback={<ProjectSkeleton />}>
            <MyComponent {...project} />
          </Suspense>
        ))}
      </div>
    </section>
  );
};