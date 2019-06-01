import { boundMethod } from 'autobind-decorator'

import call from 'ramda/src/call'
import any from 'ramda/src/any'
import none from 'ramda/src/none'
import pipe from 'ramda/src/pipe'
import includes from 'ramda/src/includes'
import curryN from 'ramda/src/curryN'
import equals from 'ramda/src/equals'
import not from 'ramda/src/not'

export function describe(s: Function) {
    return true
}

export function it(s: Function) {
    return true
}

type ArityAny = (...args: any) => any

const XNOR = (a:Boolean, b:Boolean) => b ? a : !a

const _toBe = (result:any, value:any) => result === value

class _expect {
    private result: any
    public expectedToBe: Boolean
    constructor(cb: ArityAny, ...values:Array<any>) {
        this.result = call(cb, ...values)
        this.expectedToBe = true
    }

    get not() {
        const newThis = Object.assign( Object.create( Object.getPrototypeOf(this)), this)
        newThis.expectedToBe = !newThis.expectedToBe
        return newThis
    }

  

    @boundMethod
    private toReturn (value:any) {
        return XNOR(value, this.expectedToBe)
    }

    public toBe(value:any) {
        return pipe(_toBe, this.toReturn)(value, this.result) 
    }

    public toEqual(value:any) {
        const _toEqual = (value:any) => equals(this.result, value)
        return pipe(_toEqual, this.toReturn)(value) 
    }

    public toBeAnyOf(...values:any) {
        const curried = curryN(2, _toBe)(this.result)
        const _toBeAnyOf = (...values:any) => any(curried)(values)
        /*    ramda using pipe won't compile ts       */
        return this.toReturn(_toBeAnyOf(...values))
    }

    public toBeNoneOf(...values:any) {
        const curried = curryN(2, _toBe)(this.result)
        const _toBeNoneOf = (...values:any) => none(curried)(values)
        return this.toReturn(_toBeNoneOf(...values))
    }

    
    public toBeFalsy() {
        return pipe(not, this.toReturn)(this.result)
    }
  
    
    public toBeTruthy() {
        return pipe(not, not, this.toReturn)(this.result)
    }

 
    public stringContaining(string:String) {
        const _stringContaining = (string:String) => includes(string, this.result)
        return pipe(_stringContaining, this.toReturn)(string) 
    }

    public arrayContaining(value:any) {
        const _arrayContaining = (value:any) => includes(value, this.result)
        return pipe(_arrayContaining, this.toReturn)(value) 
    }


}

export const expect = (cb: ArityAny, ...values:Array<any>)  => new _expect(cb, ...values)

export default {
    expect
}