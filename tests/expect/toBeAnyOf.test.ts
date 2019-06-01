import prufung from  '../../src'

const add = (a:number, b:number) => a + b

const passArg = (arg:any) => arg


test('toBeAnyOf', () => {
    const expected = prufung.expect(add,5,6)

    expect(expected.toBeAnyOf(11,14,15)).toBe(true)
    expect(expected.toBeAnyOf(10,9,15)).toBe(false)
    expect(expected.not.toBeAnyOf(11,10,21)).toBe(false)
    expect(expected.not.toBeAnyOf(15,20,890)).toBe(true)
    expect(expected.toBeAnyOf(11, 20)).toBe(true)
    expect(expected.toBeAnyOf(15, 90)).toBe(false)

    const expectedObj = prufung.expect(passArg, {})
    const expectedArr = prufung.expect(passArg, [])

    expect(expectedObj.toBeAnyOf({}, [])).toBe(false)
    expect(expectedArr.toBeAnyOf([], {})).toBe(false)
})

