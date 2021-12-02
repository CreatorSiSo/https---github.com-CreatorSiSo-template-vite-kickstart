// https://vitejs.dev/config/

import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';
import { getElements, getName, textContent } from 'domutils';
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
import { getElementsByTagName } from 'domutils';

export default defineConfig({
  resolve: {
    alias: {
      '@icons': '/components/app/_sprite-items/icons/',
    },
  },
  plugins: [kickstart],
});
