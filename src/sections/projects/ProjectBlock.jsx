import React, { useState } from 'react'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Zap, Shield, Globe, Code } from 'lucide-react';
import { createPortal } from 'react-dom';

const ProjectBlock = ({
  title,
  tagline="", 
  description ,
  screenshots ,
  technologies,
  highlights=[],
  metrics = [
    { label: "Active Users", value: "10K+" },
    { label: "Uptime", value: "99.9%" },
    { label: "API Calls/Day", value: "2M+" }
  ],
  githubUrl = "",
  liveUrl =""
}) => {

  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const nextScreenshot = (e) => {
    e.stopPropagation();
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = (e) => {
    e.stopPropagation();
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const openFullscreen = (index) => {
    setFullscreenIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleKeyDown = (e) => {
    if (!isFullscreen) return;
    if (e.key === 'ArrowRight') nextFullscreenImage();
    if (e.key === 'ArrowLeft') prevFullscreenImage();
    if (e.key === 'Escape') closeFullscreen();
  };

  React.useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, fullscreenIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-16 text-white ">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      {isFullscreen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close fullscreen"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 text-white text-lg font-medium z-10">
            {fullscreenIndex + 1} / {screenshots.length}
          </div>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center px-20">
            <img
              src={screenshots[fullscreenIndex]}
              alt={`${title} screenshot ${fullscreenIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Left Arrow */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={prevFullscreenImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} strokeWidth={2.5} />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextFullscreenImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight size={32} strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/50 backdrop-blur-sm p-3 rounded-lg">
              {screenshots.map((screenshot, idx) => (
                <button
                  key={idx}
                  onClick={() => setFullscreenIndex(idx)}
                  className={`relative w-20 h-14 rounded overflow-hidden transition-all duration-200 ${idx === fullscreenIndex
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-60 hover:opacity-100'
                    }`}
                >
                  <img
                    src={screenshot}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}

      {/* Main Container */}
      <div
        className="relative rounded-2xl shadow-2xl overflow-hidden glass border border-primary/30 hover:border-primary/50  transition-all duration-500 hover:shadow-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Screenshots */}
          <div className="relative  p-8 flex items-center justify-center">
            <div className="relative w-full">
              {/* Screenshot Display */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white cursor-pointer group"
                onClick={() => openFullscreen(currentScreenshot)}>
                <img
                  src={screenshots[currentScreenshot]}
                  alt={`${title} screenshot ${currentScreenshot + 1}`}
                  className="w-full h-auto object-cover transition-opacity duration-300"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    Click to view fullscreen
                  </div>
                </div>

                {/* Navigation Arrows */}
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevScreenshot}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextScreenshot}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Screenshot Indicators */}
              {screenshots.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentScreenshot(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentScreenshot
                          ? 'w-8 bg-blue-600'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      aria-label={`Go to screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Project Details */}
          <div className="p-8 flex flex-col justify-between">
            {/* Header */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
              {tagline && <p className="text-lg text-gray-200 mb-6">{tagline}</p>}
              <p className="text-gray-500 leading-relaxed mb-6 whitespace-pre-line whitespace-pre-wrap">{description}</p>

              {/* Key Highlights */}
              {highlights && <div className="grid grid-cols-2 gap-4 mb-4">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-blue-100 rounded-lg">
                      <highlight.icon size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-200">{highlight.title}</h4>
                      <p className="text-xs text-gray-500">{highlight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>}

              {/* Metrics */}
              {/* {metrics.length > 0 && (
                <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200">
                  {metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )} */}

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {liveUrl && <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ExternalLink size={18} />
                View Live Demo
              </a>}
              {githubUrl && <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Github size={18} />
                Code
              </a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBlock

// export const PortfolioShowcase = () => {
//   const projects = [
//     {
//       title: "AI-Powered Content Management SaaS",
//       tagline: "Enterprise-grade promotional content platform",
//       description: "A comprehensive SaaS solution enabling businesses to publish, manage, and personalize promotional content at scale. Features AI-driven content optimization, multi-channel distribution, and advanced analytics.",
//       screenshots: [
//         "/login.png",
//         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
//         "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop"
//       ],
//       technologies: [
//         { name: "React" }, { name: "Node.js" }, { name: "PostgreSQL" },
//         { name: "OpenAI API" }, { name: "AWS" }, { name: "Redis" }
//       ],
//       highlights: [
//         { icon: Zap, title: "Real-time Personalization", desc: "AI-driven content adaptation" },
//         { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant infrastructure" },
//         { icon: Globe, title: "Multi-channel Publishing", desc: "Web, mobile, and social" },
//         { icon: Code, title: "Developer API", desc: "RESTful with full docs" }
//       ],
//       metrics: [
//         { label: "Active Users", value: "10K+" },
//         { label: "Uptime", value: "99.9%" },
//         { label: "API Calls/Day", value: "2M+" }
//       ],
//       githubUrl: "https://github.com",
//       liveUrl: "https://example.com",
//       featured: true
//     }
//   ];

//   return (
//     <div className="py-16 px-4">
//       <div className="max-w-7xl mx-auto">

//         {projects.map((project, idx) => (
//           <Epitoni key={idx} {...project} />
//         ))}
//       </div>
//     </div>
//   );
// };

