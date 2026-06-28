import { defineConfig } from "vite-plus";

export default defineConfig({
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
});
