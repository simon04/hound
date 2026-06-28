import { defineConfig } from "vite-plus";

// The UI ships two independent, self-contained scripts. In production the Go
// server inlines each bundle directly into a <script> tag (see ui/ui.go), so
// every entry must build to a standalone IIFE with no import/export or shared
// chunks. Rolldown only allows a single input per IIFE output, so `vp build`
// is invoked once per entry, selecting the entry via --mode.
const entries: Record<string, string> = {
    hound: "ui/assets/js/hound.jsx",
    excluded_files: "ui/assets/js/excluded_files.jsx",
};

export default defineConfig(({ mode }) => ({
    test: {
        globals: true,
        clearMocks: true,
        include: ["ui/assets/js/**/*.test.js"],
        coverage: {
            reportsDirectory: "coverage",
        },
    },
    fmt: {
        tabWidth: 4,
        ignorePatterns: [
            "ui/assets/js/JSXTransformer-0.12.2.js",
            "ui/assets/js/react-0.12.2.min.js",
        ],
    },
    // JSX targets the global `React` (loaded separately via react-*.min.js),
    // using the classic runtime so no `react` import is injected.
    esbuild: {
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
    },
    build: entries[mode]
        ? {
              outDir: "ui/.build/ui/js",
              emptyOutDir: false,
              target: "es2015",
              lib: {
                  entry: entries[mode],
                  formats: ["iife"],
                  name: "Hound",
                  fileName: () => `${mode}.js`,
              },
          }
        : undefined,
}));
