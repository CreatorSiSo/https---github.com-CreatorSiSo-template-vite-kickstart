import icoVite from '@icons/ico-vite.svg?raw';

document.querySelector('#svg-sprite-storage').innerHTML = icoVite;

document.querySelector('#content').innerHTML = `
  <h1>Hello from Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">
    Documentation
  </a>
`;

document.querySelector(
  'footer'
).innerHTML = `Built with Vite in ${new Date().getFullYear()}`;
