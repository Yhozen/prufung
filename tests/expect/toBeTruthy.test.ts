import prufung from  '../../src'

const passArg = (arg:any) => arg


test('toBeTruthy', () => {
    const expectedZero = prufung.expect(passArg, 0)

    expect(expectedZero.not.toBeTruthy()).toBe(true)
})