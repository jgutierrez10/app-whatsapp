import { describe, expect, it } from 'vitest'
import {
    validateEmail,
    validateMessage,
    validateName,
    validatePhone,
    validateRequired
} from '../../src/helpers/validation.js'

describe('validation helpers', () => {
    it.each([
        ['juan@example.com', true],
        ['juan@example', false],
        ['', false]
    ])('validates email %s', (email, expected) => {
        expect(validateEmail(email)).toBe(expected)
    })

    it.each([
        ['+56 9 1234-5678', true],
        ['(56) 91234567', true],
        ['1234567', false],
        ['telefono-invalido', false]
    ])('validates phone %s', (phone, expected) => {
        expect(validatePhone(phone)).toBe(expected)
    })

    it('requires a non-empty trimmed value', () => {
        expect(validateRequired('')).toBeFalsy()
        expect(validateRequired('   ')).toBe(false)
        expect(validateRequired(' Juan ')).toBe(true)
    })

    it.each([
        ['J', false],
        ['  ', false],
        ['Juan', true]
    ])('validates name %s', (name, expected) => {
        expect(validateName(name)).toBe(expected)
    })

    it('enforces the current message boundaries of 5 to 300 characters', () => {
        expect(validateMessage('    ')).toBeFalsy()
        expect(validateMessage('Hola')).toBe(false)
        expect(validateMessage('Hola!')).toBe(true)
        expect(validateMessage('a'.repeat(300))).toBe(true)
        expect(validateMessage('a'.repeat(301))).toBe(false)
    })
})
