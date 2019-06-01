import prufung from  '../../src'

const add = (a:number, b:number) => a + b


test('not behaviour', () => {
    const expected = prufung.expect(add,5,6)

    expect(expected.toBe(11)).toBe(true)
    expect(expected.not.toBe(11)).toBe(false)
    expect(expected.toBe(11)).toBe(true)
    expect(expected.not.not.toBe(11)).toBe(true)
})



