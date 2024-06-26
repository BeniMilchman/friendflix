import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        setupFiles: ["/tests/setup.ts"],
        clearMocks: true,
        include: ["**/*.test.tsx"],
        environment: "jsdom",
        globals: true
    }
})
