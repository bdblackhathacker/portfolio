import { Suspense, lazy, useCallback, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SystemHUD } from './components/SystemHUD';
import { BootSequence } from './components/BootSequence';
import './styles/globals.css';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const AITerminal = lazy(() => import('./components/AITerminal'));
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
    setBooted(true);
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
          <Skills />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AITerminal />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
