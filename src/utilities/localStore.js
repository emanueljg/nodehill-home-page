let store;

try {
  store = JSON.parse(localStorage.store);
}
catch (e) {
  store = {
    // Initial values
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '0',
    cookiesApproved: '0'
  };
}

store.save = () => localStorage.store = JSON.stringify(store);

export default store;