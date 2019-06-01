import prufung from  '../../src'

const add = (a:number, b:number) => a + b

const passArg = (arg:any) => arg


test('toEqual', () => {
    const expected = prufung.expect(add,5,6)

    expect(expected.toEqual(11)).toBe(true)
    expect(expected.toEqual(15)).toBe(false)
    expect(expected.not.toEqual(11)).toBe(false)
    expect(expected.not.toEqual(15)).toBe(true)
    expect(expected.toEqual(11)).toBe(true)
    expect(expected.toEqual(15)).toBe(false)

    const expectedObj = prufung.expect(passArg, {})
    const expectedArr = prufung.expect(passArg, [])

    expect(expectedObj.toEqual({})).toBe(true)
    expect(expectedArr.toEqual([])).toBe(true)
})

