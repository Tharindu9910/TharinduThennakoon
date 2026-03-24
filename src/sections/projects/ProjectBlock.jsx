import React, { useState, useEffect, useRef, memo } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const ProjectBlock = memo(({
  title,
  tagline = "",
  description,
  screenshots,
  technologies,
  highlights = [],
  metrics = [],
  githubUrl = "",
  liveUrl = ""
}) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const touchStartX = useRef(null);
  const fullscreenTouchStartX = useRef(null);

  const nextScreenshot = (e) => {
    e?.stopPropagation();
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = (e) => {
    e?.stopPropagation();
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const openFullscreen = (index) => {
    setFullscreenIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => setIsFullscreen(false);
  const nextFullscreen = () => setFullscreenIndex((p) => (p + 1) % screenshots.length);
  const prevFullscreen = () => setFullscreenIndex((p) => (p - 1 + screenshots.length) % screenshots.length);

  // Keyboard nav for fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight') nextFullscreen();
      if (e.key === 'ArrowLeft') prevFullscreen();
      if (e.key === 'Escape') closeFullscreen();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, fullscreenIndex]);

  // Touch swipe handlers for carousel
  const handleCarouselTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleCarouselTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? nextScreenshot() : prevScreenshot();
    touchStartX.current = null;
  };

  // Touch swipe handlers for fullscreen
  const handleFullscreenTouchStart = (e) => {
    fullscreenTouchStartX.current = e.touches[0].clientX;
  };
  const handleFullscreenTouchEnd = (e) => {
    if (fullscreenTouchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - fullscreenTouchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? nextFullscreen() : prevFullscreen();
    fullscreenTouchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-10 sm:mb-16 text-white">
      {/* Ambient glows — hidden on very small screens for perf */}
      <div className="hidden sm:block absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      {/* Fullscreen portal */}
      {isFullscreen && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
          onTouchStart={handleFullscreenTouchStart}
          onTouchEnd={handleFullscreenTouchEnd}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 shrink-0">
            <span className="text-white/70 text-sm font-medium">
              {fullscreenIndex + 1} / {screenshots.length}
            </span>
            <button
              onClick={closeFullscreen}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Close fullscreen"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image */}
          <div className="relative flex-1 flex items-center justify-center px-10 sm:px-20 min-h-0">
            <img
              src={screenshots[fullscreenIndex]}
              alt={`${title} screenshot ${fullscreenIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded"
            />
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={prevFullscreen}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-2 sm:p-3 rounded-full transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextFullscreen}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-2 sm:p-3 rounded-full transition-all"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {screenshots.length > 1 && (
            <div className="shrink-0 flex justify-center gap-2 p-3 sm:p-4 overflow-x-auto">
              {screenshots.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setFullscreenIndex(idx)}
                  className={`relative w-14 h-10 sm:w-20 sm:h-14 rounded overflow-hidden shrink-0 transition-all ${
                    idx === fullscreenIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden border border-primary/30 md:glass hover:border-primary/50 transition-[border-color,box-shadow] duration-300 hover:shadow-xl">
        {/* Mobile: stacked. md+: side-by-side */}
        <div className="flex flex-col md:grid md:grid-cols-2">

          {/* ── Screenshot column ── */}
          <div className="relative p-4 sm:p-6 md:p-8 flex items-center justify-center border-b border-primary/20 md:border-b-0 md:border-r md:border-primary/20">
            <div className="relative w-full">
              {/* Main image */}
              <div
                className="relative rounded-xl overflow-hidden bg-white cursor-pointer group"
                onClick={() => openFullscreen(currentScreenshot)}
                onTouchStart={handleCarouselTouchStart}
                onTouchEnd={handleCarouselTouchEnd}
              >
                <img
                  src={screenshots[currentScreenshot]}
                  alt={`${title} screenshot ${currentScreenshot + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
                {/* Fullscreen hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <Maximize2 size={14} />
                    View fullscreen
                  </div>
                </div>

                {/* Prev/Next arrows — larger tap targets on mobile */}
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevScreenshot}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white p-1.5 sm:p-2 rounded-full transition-all"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextScreenshot}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white p-1.5 sm:p-2 rounded-full transition-all"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {screenshots.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3">
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentScreenshot(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentScreenshot ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Details column ── */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5">
            {/* Title & tagline */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{title}</h3>
              {tagline && <p className="text-sm sm:text-base text-gray-300 mt-1">{tagline}</p>}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed whitespace-pre-line">
              {description}
            </p>

            {/* Highlights — 2-col on sm+, 1-col on xs */}
            {highlights.length > 0 && (
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-1.5 bg-blue-500/15 rounded-lg shrink-0">
                      <h.icon size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-200 leading-snug">{h.title}</p>
                      <p className="text-xs text-gray-500 leading-snug">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech stack */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons — full-width on mobile */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-auto pt-1">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:from-blue-700 active:to-blue-800 text-white px-4 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 text-white px-4 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  <Github size={15} />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectBlock;