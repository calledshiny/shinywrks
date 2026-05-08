import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './components/Landing';
import ProjectDetail from './components/ProjectDetail';
import Kontakt from './components/Kontakt';

export default function App() {
  const [projects, setProjects] = useState(null);
  const [page, setPage] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  function applyHash(data) {
    const h = window.location.hash.slice(1);
    if (h.startsWith('/projekt/')) {
      const proj = data.find(p => p.slug === h.slice(9));
      if (proj) { setPage('project'); setActiveProject(proj); return; }
    }
    if (h === '/kontakt') { setPage('contact'); return; }
    setPage('home');
  }

  useEffect(() => {
    fetch('projects.json')
      .then(r => r.json())
      .then(data => { setProjects(data); applyHash(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!projects) return;
    const onHash = () => { applyHash(projects); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [projects]);

  const nav = (p, proj = null) => {
    if (p === 'home') window.location.hash = '/';
    else if (p === 'contact') window.location.hash = '/kontakt';
    else if (p === 'project' && proj) window.location.hash = `/projekt/${proj.slug}`;
  };

  if (!projects) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B8A4' }}>
      Lädt …
    </div>
  );

  return (
    <div>
      <Nav page={page} onNav={nav}/>
      {page === 'home'    && <Landing onNav={nav} projects={projects} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>}
      {page === 'project' && <ProjectDetail project={activeProject} projects={projects} onNav={nav}/>}
      {page === 'contact' && <Kontakt/>}
      <Footer onNav={nav}/>
    </div>
  );
}
