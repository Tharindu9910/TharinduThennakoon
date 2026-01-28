
export const Education = () => {
  return (
    <section id="education" className="relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          {/* <span
            className="text-secondary-foreground text-sm
           font-medium tracking-wider uppercase animate-fade-in"
          >
            Career Journey
          </span> */}
          <h2
            className="text-4xl md:text-5xl font-bold
           mt-4 mb-6 animate-fade-in animation-delay-100
            text-secondary-foreground"
          >
            Education
        
          </h2>

          <div className="space-y-8 max-w-4xl">
      {/* Degree Item */}
      <div className="relative pl-8 border-l-2 border-primary/30 group animate-fade-in animation-delay-200">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform" />
        
        <div className="bg-secondary/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
          <span className="text-primary font-mono text-sm">2021 Jun — 2024 Apr</span>
          <h3 className="text-2xl font-bold mt-2 text-secondary-foreground">BSc. in Physical Science (ICT)</h3>
          <p className="text-muted-foreground font-medium">University of Sri Jayewardenepura</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground/80 list-disc list-inside">
            <li>Proficient in Software Development principles, Networking fundamentals, and optimized Data Structures.</li>
            <li>Strong background in higher mathematics, including Linear Algebra, Calculus, and Complex Analysis.</li>
          </ul>
        </div>
      </div>

      {/* School Item */}
      <div className="relative pl-8 border-l-2 border-primary/30 group animate-fade-in animation-delay-300">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/50 group-hover:scale-125 transition-transform" />
        
        <div className="bg-secondary/10 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
          {/* <span className="text-primary/70 font-mono text-sm">Graduated 2019</span> */}
          <h3 className="text-xl font-bold mt-1 text-secondary-foreground">Advanced Level – Physical Stream</h3>
          <p className="text-muted-foreground">Maliyadeva College, Kurunegala</p>
        </div>
      </div></div>
        </div>

      </div>
    </section>
  );
};
