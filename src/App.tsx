import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SystemHUD } from './components/SystemHUD';
import { BootSequence } from './components/BootSequence';
import { CommandPalette } from './components/CommandPalette';
import { RankBadge } from './components/RankBadge';
import { ThemeOrb } from './components/ThemeOrb';
import { initTheme } from './utils/theme';
import { sfx } from './utils/sound';
import './styles/globals.css';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const ThreatMap = lazy(() => import('./components/ThreatMap'));
const Skills = lazy(() => import('./components/Skills'));
const Services = lazy(() => import('./components/Services'));
const Resume = lazy(() => import('./components/Resume'));
const AITerminal = lazy(() => import('./components/AITerminal'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [booted, setBooted] = useState(() => {
    // show boot once per session — 2799 systems boot fast on return
    try {
      return sessionStorage.getItem('neo-grid-booted') === '1';
    } catch {
      return false;
    }
  });

  const handleBooted = useCallback(() => {
    try {
      sessionStorage.setItem('neo-grid-booted', '1');
    } catch {
      /* ignore */
    }
    sfx.boot();
    setBooted(true);
  }, []);

  // theme + smooth scroll + reveal — the world-best motion layer
  useEffect(() => {
    initTheme();

    let lenis: { destroy: () => void } | null = null;
    (async () => {
      try {
        const mod = await import('lenis');
        const Lenis = mod.default;
        const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis = instance as unknown as { destroy: () => void };
        const raf = (t: number) => {
          (instance as unknown as { raf: (t: number) => void }).raf(t);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch { /* fallback to native scroll */ }
    })();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    const observe = () => {
      document.querySelectorAll('main section:not(.reveal-visible)').forEach((s) => io.observe(s));
    };
    observe();
    // lazy sections mount later — keep watching for them
    const mo = new MutationObserver(observe);
    const mainEl = document.querySelector('main');
    if (mainEl) mo.observe(mainEl, { childList: true, subtree: true });
    // safety: never leave a section invisible
    const safety = setTimeout(() => {
      document.querySelectorAll('main section').forEach((s) => s.classList.add('reveal-visible'));
    }, 5000);

    return () => {
      lenis?.destroy();
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <>
      {!booted && <BootSequence onDone={handleBooted} />}
      <SystemHUD />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Experience />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ThreatMap />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Services />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Resume />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AITerminal />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <CommandPalette />
      <RankBadge />
      <ThemeOrb />
    </>
  );
}

export default App;
