// https://vitejs.dev/config/

import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';
import { getElements, getName, textContent } from 'domutils';
import { getElementsByTagName } from 'domutils';
import serializeDOM from 'dom-serializer';

/**
 * @type {import('vite').Plugin}
 */
const kickstart = {
  name: 'kickstart',

  transform(code, id) {
    if (id.endsWith('.html')) console.log(code);
    return code;
  },

  transformIndexHtml(html, _context, _bundle) {
    let returnHtml;

    const handler = new DomHandler(
      (error, dom) => {
        if (error) {
          console.error('Could not parse DOM.');
        } else {
          getElements({ tag_name: 'HeaderComponent' }, dom, true).forEach(
            (element) => console.log(textContent(element))
          );

          returnHtml = serializeDOM(dom, { xmlMode: false });
        }
      },
      { withStartIndices: true, withEndIndices: true }
    );

    const parser = new Parser(handler, {
      xmlMode: true,
      recognizeSelfClosing: true,
    });
    parser.write(html);
    parser.end();

    return returnHtml;
  },
};

import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: 'node_modules/.vite',
  publicDir: 'public',
  // Base public path when served in development or production.
  base: '/',

  logLevel: 'info',

  server: {
    port: 3000,
    // If port is already in use, automatically try the next available port.
    strictPort: false,
    fs: {
      // Restrict serving files outside of workspace root.
      strict: true,
    },
    watch: {
      // Enable this if you are using the Windows Subsystem for Linux (WSL).
      // usePolling: true,
    },
  },

  resolve: {
    alias: {
      '@icons': '/components/app/_sprite-items/icons/',
    },
  },

  build: {
    // Specify the output directory.
    outDir: './build',
    // Directory to nest generated assets under (relative to build.outDir).
    assetsDir: 'assets',
  },

  plugins: [
    /* kickstart */
  ],
});
