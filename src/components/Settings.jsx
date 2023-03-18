import { useStates } from '../utilities/states';

export default function Settings() {

  const isSafari = (navigator.vendor || '').includes('Apple');
  document.body.classList[isSafari ? 'add' : 'remove']('safari');

  const lStore = useStates('localStore');

  document.body.classList[lStore.cookiesApproved === '1' ? 'remove' : 'add']('cookieApprovalMargin');
  document.body.classList[lStore.darkMode === '0' ? 'remove' : 'add']('dark-mode');

  function clickFix(e) {
    e.target.blur();
    e.target.name === 'cookiesApproved' && window.scrollTo(0, 100000);
  }

  return <div className="settings">
    <label><span>Cookies</span><input onClick={clickFix} className="form-range" type="range" min="0" max="1"  {...lStore.bind('cookiesApproved')} /></label>
    <label><span>Dark mode</span><input onClick={clickFix} className="form-range" type="range" min="0" max="1"  {...lStore.bind('darkMode')} /></label>
  </div>
}