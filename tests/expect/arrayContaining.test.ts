import prufung from  '../../src'

const passArg = (arg:any) => arg


test('arrayContaining', () => {
    const expectedZero = prufung.expect(passArg, [1,2,3,4,5])

    expect(expectedZero.arrayContaining(2)).toBe(true)
    expect(expectedZero.arrayContaining(6)).toBe(false)
})