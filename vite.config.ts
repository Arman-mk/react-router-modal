import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // путь к основному файлу библиотеки
      entry: path.resolve(__dirname, "src/app/index.ts"),
      // название библиотеки
      name: "ReactRouterModal",
      // форматы генерируемых файлов
      formats: ["es", "umd"],
      // названия генерируемых файлов
      fileName: (format) => `react-router-modal.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
