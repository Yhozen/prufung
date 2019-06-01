import prufung from  '../../src'

const passArg = (arg:any) => arg


test('stringContaining', () => {
    const expectedString = prufung.expect(passArg, 'Hello world!')

    expect(expectedString.stringContaining('Hello')).toBe(true)
    expect(expectedString.stringContaining('Sopa')).toBe(false)
})