import { useEffect } from 'react';
import NavMenu from './NavMenu';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useStates } from '../utilities/states';
import localStore from '../utilities/localStore';
import MarkDownViewer from './handle-markdown/MarkDownViewer';
import Logo from './Logo';
import Footer from './Footer';

export default function App() {

  const navigate = useNavigate();

  const s = useStates('main', {
    mdLoaded: false,
    menu: []
  });

  const lStore = useStates('localStore', localStore);
  useEffect(() => lStore.save() && undefined, [lStore]);

  useEffect(() => {
    // Load the menu strcuture
    (async () => {
      // Load the menu structure
      s.menu = (await (await fetch('/backend.php?menuStructure')).json())[0].menuStructure;
      // Load the markdown content
      let mdContent = await (await fetch('/backend.php?markdownContent')).json()
      // Process the menu structure
      let routes = [...s.menu].filter(x => x.path);
      s.menu.filter(x => x.sub).forEach(x => routes = [...routes, ...x.sub]);
      routes.forEach(x => x.path && (x.md = x.path.slice(1)));
      routes.forEach(x => x.Component = MarkDownViewer);
      routes.forEach(x => x.mdContent =
        mdContent.find(y => y.slug === x.path || y.slug === '/start'));
      routes.forEach(x => x.mdContent = x.mdContent.markdown)
      s.menu.forEach(x => x.sub && x.sub.forEach(y => !y.parent && (y.parent = x)));
      s.routes = routes;
      s.mdLoaded = true;
    })();

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

  let routes = s.routes;
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
    {lStore.cookiesApproved === '0' && <div className="approveCookies">
      <div>
        <p>Vi använder cookies för att ge dig den bästa upplevelsen på vår webbplats.</p>
        <p>Om du fortsätter att använda webbplatsen utgår vi från att du godkänner detta.</p>
        <button className="btn btn-primary" onClick={() => lStore.cookiesApproved = '1'}>OK</button>
      </div>
    </div>}
  </>
}