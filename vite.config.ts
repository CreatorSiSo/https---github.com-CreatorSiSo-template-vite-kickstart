import { fileURLToPath, resolve, URL } from 'url';
import { defineConfig, UserConfig } from 'vite';

const root = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig((/* { command, mode } */) => {
  const baseConfig: UserConfig = {
    root: './src',
    base: '/',
    publicDir: 'public',
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./src', import.meta.url)),
          nested: new URL('', root),
        },
      },
      outDir: '../build',
      emptyOutDir: true,
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': root,
      },
    },
  };

  return baseConfig;

  // if (mode === 'production') {
  //   return {
  //     ...baseConfig,
  //     build: {
  //       outDir: 'build',
  //       assetsDir: 'assets',
  //       minify: 'terser',
  //     },
  //   };
  // } else {
  //   return {
  //     ...baseConfig,
  //     build: {
  //       outDir: 'build',
  //       assetsDir: 'assets',
  //       minify: false,
  //     },
  //   };
  // }
});
