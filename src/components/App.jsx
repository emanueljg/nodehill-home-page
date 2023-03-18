import { useEffect } from 'react';
import NavMenu from './NavMenu';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useStates } from '../utilities/states';
import MarkDownViewer from './handle-markdown/MarkDownViewer';
import Logo from './Logo';
import Footer from './Footer';

export default function App() {

  const navigate = useNavigate();

  const s = useStates('main', {
    mdLoaded: false,
    // Main menu!
    // Note the property Component can be used too 
    // in order to navigate and mount a special component
    // if only md/markdown is provided the component
    // MarkDownViewer will be used with the markdown
    menu: [
      { label: 'Start', path: '/', md: 'start' },
      { label: 'About us', path: '/about', md: 'about' },
      {
        label: 'Our customers', sub: [
          { label: 'Page 4', path: '/page4', md: 'page4' },
          { label: 'Page 5', path: '/page5', md: 'page5' }
        ]
      },
      { label: 'Our team', path: '/our-team', md: 'our-team' },
      { label: 'Top 10', path: '/top-10', md: 'top-10' },
      {
        label: 'Classroom stories', sub: [
          { label: 'Page 7', path: '/page7', md: 'page7' },
          { label: 'Page 8', path: '/page8', md: 'page8' }
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
      let allMd = routes
        .filter(x => x.md && (x.Component = x.Component || MarkDownViewer))
        .map(x => fetch('/markdown/' + x.md + '.md').then(x => x.text()));
      (await Promise.all(allMd)).forEach((t, i) => routes[i].mdContent = t);
      s.mdLoaded = true;
    })();
    // Fix clicks on hamburger menu items and sub menu items 
    // so that the menu hides after click
    const clickListener = e => {
      let toggler = document.querySelector('button.navbar-toggler');
      if (toggler.clientHeight && e.target.closest('.nav-link, .dropdown-item')
        && !e.target.classList.contains('dropdown-toggle')) {
        setTimeout(() => toggler.click(), 1);
      }
      else if (e.target.closest('.dropdown-item')) {
        setTimeout(() => document.body.click(), 0);
      }
      else if (e.target.closest('.navbar-nav') && !e.target.closest('a')) {
        // click on logo in navbar
        navigate('/');
      }
    }
    document.body.addEventListener('click', clickListener);

    const scrollListener = e => {
      let logo = document.querySelector('header .logo');
      let navbarContainer = document.querySelector('.navbar .container');
      if (logo && window.scrollY > logo.clientHeight) {
        navbarContainer.classList.add('showlogo');
      }
      else {
        navbarContainer.classList.remove('showlogo');
      }
    }
    window.addEventListener('scroll', scrollListener);


    return () => {
      document.body.removeEventListener('click', clickListener);
      window.removeEventListener('scroll', scrollListener);
    };

  }, []);

  const location = useLocation();
  useEffect(() => {
    let logo = document.querySelector('header .logo');
    logo && window.scrollTo(0, window.innerWidth < 992 ? 0 : logo.clientHeight + 1);
  }, [location]);

  return !s.mdLoaded ? null : <>
    <header>
      <Logo />
    </header>
    <NavMenu />
    <div className="print-pagename">
      {routes.find(x => x.path === location.pathname)?.label}
    </div>
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