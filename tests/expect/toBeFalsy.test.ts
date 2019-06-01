import prufung from  '../../src'


const and = (a:boolean, b:boolean) => a && b

const passArg = (arg:any) => arg


test('toBeFalsy', () => {
    const expectedFalse = prufung.expect(and,true,false)
    const expectedZero = prufung.expect(passArg, 0)
    const expectedSingleQuoteEmpty = prufung.expect(passArg, '')
    const expectedDoubleQuoteEmpty = prufung.expect(passArg, "")
    const expectedNaN = prufung.expect(passArg, NaN)
    const expectedNull = prufung.expect(passArg, null)
    const expectedUndefined = prufung.expect(passArg, undefined)

    expect(expectedFalse.toBeFalsy()).toBe(true)
    expect(expectedZero.toBeFalsy()).toBe(true)
    expect(expectedSingleQuoteEmpty.toBeFalsy()).toBe(true)
    expect(expectedDoubleQuoteEmpty.toBeFalsy()).toBe(true)
    expect(expectedNaN.toBeFalsy()).toBe(true)
    expect(expectedNull.toBeFalsy()).toBe(true)
    expect(expectedUndefined.toBeFalsy()).toBe(true)

    expect(expectedFalse.not.toBeFalsy()).toBe(false)
    expect(expectedZero.not.toBeFalsy()).toBe(false)
    expect(expectedSingleQuoteEmpty.not.toBeFalsy()).toBe(false)
    expect(expectedDoubleQuoteEmpty.not.toBeFalsy()).toBe(false)
    expect(expectedNaN.not.toBeFalsy()).toBe(false)
    expect(expectedNull.not.toBeFalsy()).toBe(false)
    expect(expectedUndefined.not.toBeFalsy()).toBe(false)
})