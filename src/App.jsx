import { useEffect } from 'react';
import NavMenu from './NavMenu';
import { Routes, Route } from 'react-router-dom';
import { useStates } from './utilities/states';
import MarkDownViewer from './MarkDownViewer';
import Start from './Start'

export default function App() {

  const s = useStates('main', {
    mdLoaded: false,
    menu: [
      { path: '/', label: 'Start', md: 'start' },
      { path: '/about', label: 'About', md: 'about' },
      {
        label: 'More', sub: [
          { path: '/good', label: 'Good', md: 'good' },
          { path: '/bad', label: 'Bad', md: 'bad' }
        ]
      }
    ]
  });

  let routes = [...s.menu].filter(x => !x.sub);
  s.menu.forEach(x => x.sub && (routes = [...routes, ...x.sub]));

  useEffect(() => {
    (async () => {
      for (let route of routes.filter(x => x.md)) {
        route.mdContent = await (await fetch('/markdown/' + route.md + '.md')).text();
      }
      s.mdLoaded = true;
    })();
  }, []);


  return !s.mdLoaded ? null : <>
    <header>
      <NavMenu />
    </header>
    <main className="mt-5 container">
      <Routes>
        {routes.map(({ path, Component, mdContent }) => mdContent ?
          <Route path={path} element={<MarkDownViewer content={mdContent} />} /> :
          <Route path={path} element={<Component />} />
        )}
      </Routes>
    </main>
    <footer className="container-fluid text-light">
      <div className="row py-3">
        <div className="col text-center text-dark">
          <p className="m-0">Goodbye world!</p>
        </div>
      </div>
    </footer>
  </>
}