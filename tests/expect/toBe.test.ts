import prufung from  '../../src'

const add = (a:number, b:number) => a + b

const passArg = (arg:any) => arg


test('toBe', () => {
    const expected = prufung.expect(add,5,6)

    expect(expected.toBe(11)).toBe(true)
    expect(expected.toBe(15)).toBe(false)
    expect(expected.not.toBe(11)).toBe(false)
    expect(expected.not.toBe(15)).toBe(true)
    expect(expected.toBe(11)).toBe(true)
    expect(expected.toBe(15)).toBe(false)

    const expectedObj = prufung.expect(passArg, {})
    const expectedArr = prufung.expect(passArg, [])

    expect(expectedObj.toBe({})).toBe(false)
    expect(expectedArr.toBe([])).toBe(false)
})

