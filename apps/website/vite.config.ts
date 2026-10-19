import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    // Run React component libraries through Preact's compatibility layer.
    alias: [
      { find: /^react-dom\/client$/, replacement: "preact/compat/client" },
      { find: /^react(?:-dom)?$/, replacement: "preact/compat" },
      { find: /^react\/(jsx-runtime|jsx-dev-runtime)$/, replacement: "preact/$1" },
    ],
  },
});
