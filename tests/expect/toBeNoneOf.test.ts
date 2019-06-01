import prufung from  '../../src'

const add = (a:number, b:number) => a + b

const passArg = (arg:any) => arg


test('toBeNoneOf', () => {
    const expected = prufung.expect(add,5,6)

    expect(expected.toBeNoneOf(11,14,15)).toBe(false)
    expect(expected.toBeNoneOf(10,9,15)).toBe(true)
    expect(expected.not.toBeNoneOf(11,10,21)).toBe(true)
    expect(expected.not.toBeNoneOf(15,20,890)).toBe(false)
    expect(expected.toBeNoneOf(11, 20)).toBe(false)
    expect(expected.toBeNoneOf(15, 90)).toBe(true)

    const expectedObj = prufung.expect(passArg, {})
    const expectedArr = prufung.expect(passArg, [])

    expect(expectedObj.toBeNoneOf({}, [])).toBe(true)
    expect(expectedArr.toBeNoneOf([], {})).toBe(true)
})

