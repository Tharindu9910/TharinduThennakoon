import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Download,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import { mySkills } from "../constants";
import { hero, medium, profile } from "../assets/images";

const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS",
  "Tailwind CSS",
  "GSAP",
  "Python",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Neo4j",
  "MySQL",
  "Java",
  "Docker",
  "AWS",
  "GCP",
  "Firebase",
  "Playwright",
  "Flutter",
  "Figma",
  "Git",
  "GitHub Actions",
  "BitBucket",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${15 + Math.random() * 20
                }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-25 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center ">
          {/* Left Column - Text Content */}
          <div className="space-y-2 md:pl-10">
            <div className="animate-fade-in">
              <span className="inline-flex font-poppins items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Full stack developer  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> Cloud Solutions Engineer  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> Problem Solver
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4 ">
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight animate-fade-in animation-delay-100">
              Turning Complex Problems into
                <br />
                <span className="text-primary glow-text"> Elegant Solutions</span>
                <br />
              </h1>
              <p className="sm:text-lg text-md text-muted-foreground font-poppins max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Tharindu Thennakoon. I'm Transforming ideas into production-ready applications across web, mobile, and cloud
                with a focus on performance, security, and real-world impact.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-5 animate-fade-in animation-delay-300">
            <a href="#contact"><Button size="lg">
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button></a>
              <AnimatedBorderButton>
                <Download className="w-5 h-5" />
                Download CV
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex pt-2 items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me: </span>
              {[
                { icon: Github, href: "https://github.com/Tharindu9910" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/tharindu-thennakoon" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
              <a href="https://medium.com/@tharindutkt" target="_blank" className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"><img
                  src={medium}
                  alt="medium"
                  className='w-[20px] object-contain'
                /></a>
            </div>
          </div>
          {/* Right Column - Profile Image */}
          <div className="relatice animate-fade-in animation-delay-300 xl:pl-30 ">
            {/* Profile Image */}
            <div className="relative max-w-[300px] sm:max-w-sm mx-auto">
              <div
                className="absolute inset-0 
              rounded-3xl bg-gradient-to-br 
              from-primary/30 via-transparent 
              to-primary/10 blur-2xl animate-pulse"
              />
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src={profile}
                  alt="Tharindu Thennakoon"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text">2+</div>
                  <div className="text-xs text-white">
                    Years Exp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* skills new */}
        <div className='py-10 flex flex-col'>
        <p className="text-sm text-muted-foreground mb-2 text-center">
            Technologies I worked with
          </p>

        <div className='mt-16 flex flex-wrap gap-12'>
          {mySkills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center py-2 hover:bg-white/10 transition-colors'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-10 animate-fade-in animation-delay-600">
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
             bg-gradient-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
             bg-gradient-to-l from-background to-transparent z-10"
            />
            <div className="flex animate-marquee w-max">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
{/* 
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div> */}
    </section>
  );
};
