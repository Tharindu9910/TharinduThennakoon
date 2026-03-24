import React, { useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const EducationItem = ({ period, degree, institution, bullets = [], dimDot = false, delay = 0 }) => {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className="relative pl-7 sm:pl-10 border-l-2 border-primary/30 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {/* Dot */}
      <div
        className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-125 ${
          dimDot ? "bg-primary/50" : "bg-primary"
        }`}
      />

      <div className="bg-secondary/20 p-4 sm:p-6 rounded-2xl border border-white/5 transition-colors duration-300 md:backdrop-blur-sm md:glass md:hover:border-primary/50">
        {period && (
          <span className="text-primary font-mono text-xs sm:text-sm">{period}</span>
        )}
        <h3
          className={`font-bold mt-1 sm:mt-2 text-secondary-foreground leading-snug ${
            dimDot ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          }`}
        >
          {degree}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground font-medium mt-0.5">{institution}</p>
        {bullets.length > 0 && (
          <ul className="mt-3 sm:mt-4 space-y-1.5 text-xs sm:text-sm text-muted-foreground/80 list-disc list-inside">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
};

export const Education = () => {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section id="education" className="py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Header */}
          <div
            ref={headerRef}
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-8 sm:mb-10 text-secondary-foreground">
              Education
            </h2>
          </div>

          {/* Items */}
          <div className="space-y-6 sm:space-y-8 max-w-4xl">
            <EducationItem
              period="2021 Jun — 2024 Apr"
              degree="BSc. in Physical Science (ICT)"
              institution="University of Sri Jayewardenepura"
              bullets={[
                "Proficient in Software Development principles, Networking fundamentals, and optimized Data Structures.",
                "Strong background in higher mathematics, including Linear Algebra, Calculus, and Complex Analysis.",
              ]}
              delay={0}
            />
            <EducationItem
              period=""
              degree="Advanced Level – Physical Stream"
              institution="Maliyadeva College, Kurunegala"
              dimDot
              delay={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};