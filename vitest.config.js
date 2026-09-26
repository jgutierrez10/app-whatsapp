import { defineConfig, mergeConfig } from 'vite'
import viteConfig from './vite.config.js'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                url: 'http://localhost/'
            }
        },
        setupFiles: ['./tests/setup.js'],
        include: ['tests/**/*.spec.js'],
        clearMocks: true,
        mockReset: true,
        restoreMocks: true,
        css: false,
        coverage: {
            provider: 'v8',
            all: true,
            include: ['src/**/*.{js,vue}'],
            reporter: ['text', 'text-summary', 'html', 'lcov'],
            thresholds: {
                lines: 90,
                functions: 90,
                statements: 90,
                branches: 90
            }
        }
    }
}))
