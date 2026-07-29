import { useEffect, useMemo, useState } from 'react';
import { useLang, localizeProjects } from './i18n';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './components/Landing';
import ProjectDetail from './components/ProjectDetail';
import Kontakt from './components/Kontakt';

export default function App() {
  const { lang, t } = useLang();
  const [rawProjects, setRawProjects] = useState(null);
  const [page, setPage] = useState('home');
  const [activeSlug, setActiveSlug] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = useMemo(() => localizeProjects(rawProjects, lang), [rawProjects, lang]);

  function applyHash(data) {
    const h = window.location.hash.slice(1);
    if (h.startsWith('/projekt/')) {
      const proj = data.find(p => p.slug === h.slice(9));
      if (proj) { setPage('project'); setActiveSlug(proj.slug); return; }
    }
    if (h === '/kontakt') { setPage('contact'); return; }
    setPage('home');
  }

  useEffect(() => {
    fetch('projects.json')
      .then(r => r.json())
      .then(data => { setRawProjects(data); applyHash(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!rawProjects) return;
    const onHash = () => { applyHash(rawProjects); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [rawProjects]);

  const nav = (p, proj = null) => {
    if (p === 'home') window.location.hash = '/';
    else if (p === 'contact') window.location.hash = '/kontakt';
    else if (p === 'project' && proj) window.location.hash = `/projekt/${proj.slug}`;
  };

  if (!projects) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B8A4' }}>
      {t('loading')}
    </div>
  );

  const activeProject = projects.find(p => p.slug === activeSlug) || projects[0];

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
