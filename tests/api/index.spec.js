import { describe, expect, it } from 'vitest'
import api from '../../src/api/index.js'

describe('API client', () => {
    it('keeps the configured JSON, timeout and credential contract', () => {
        expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL)
        expect(api.defaults.timeout).toBe(10000)
        expect(api.defaults.withCredentials).toBe(false)
        expect(api.defaults.headers['Content-Type']).toBe('application/json')
    })
})
