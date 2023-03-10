import { useEffect } from 'react';
import NavMenu from './NavMenu';
import { Routes, Route } from 'react-router-dom';
import { useStates } from './utilities/states';
import MarkDownViewer from './MarkDownViewer';
import Logo from './Logo';
import Footer from './Footer';

export default function App() {

  const s = useStates('main', {
    mdLoaded: false,
    menu: [
      { label: 'Hem', path: '/', md: 'hem' },
      { label: 'About', path: '/about', md: 'about' },
      {
        label: 'More', sub: [
          { label: 'Much more', path: '/good', md: 'good' },
          { label: 'Much less', path: '/bad', md: 'bad' }
        ]
      },
      { label: 'Om företaget', path: '/s', md: 'hem' },
      { label: 'YH-utbildningar', path: '/abouts', md: 'about' },
      {
        label: 'Företagsutbildningar', sub: [
          { label: 'Inom React', path: '/goods', md: 'good' },
          { label: 'Inom agil metodik', path: '/bads', md: 'bad' }
        ]
      }
    ]
  });

  let routes = [...s.menu].filter(x => x.path);
  s.menu.filter(x => x.sub).forEach(x => routes = [...routes, ...x.sub]);
  s.menu.forEach(x => x.sub && x.sub.forEach(y => !y.parent && (y.parent = x)));

  useEffect(() => {
    // Load all the markdown
    (async () => {
      for (let route of routes.filter(x => x.md)) {
        route.mdContent = await (await fetch('/markdown/' + route.md + '.md')).text();
        route.Component = route.Component || MarkDownViewer;
      }
      s.mdLoaded = true;
    })();
    // Fix clicks on hamburger menu items and clicks sub menu items 
    // so that the menu hides after click
    let listener = e => {
      let toggler = document.querySelector('button.navbar-toggler');
      if (toggler.clientHeight && e.target.closest('.nav-link, .dropdown-item')
        && !e.target.classList.contains('dropdown-toggle')) {
        setTimeout(() => toggler.click(), 1);
      }
      else if (e.target.closest('.dropdown-item')) {
        setTimeout(() => document.body.click(), 0);
      }
    }
    document.body.addEventListener('click', listener);
    return () => document.body.removeEventListener('click', listener);
  }, []);


  return !s.mdLoaded ? null : <>
    <header>
      <Logo />
    </header>
    <NavMenu />
    <main>
      <div className="container">
        <Routes>
          {routes.map(({ path, Component, mdContent }) => mdContent ?
            <Route path={path} element={<Component path={path} mdContent={mdContent} />} /> :
            <Route path={path} element={<Component path={path} />} />
          )}
        </Routes>
      </div>
    </main>
    <footer className="container-fluid text-light">
      <Footer />
    </footer>
  </>
}