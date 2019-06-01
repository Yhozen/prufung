import { boundMethod } from 'autobind-decorator'
import equals from 'ramda/es/equals'
import call from 'ramda/es/call'
import any from 'ramda/es/any'
import none from 'ramda/es/none'
import pipe from 'ramda/es/pipe'
import includes from 'ramda/es/includes'

export function describe(s: Function) {
    return true
}

export function it(s: Function) {
    return true
}

const falsyValues = [
    false, 0, '', "", null, undefined, NaN
] 

type ArityAny = (...args: any) => any


class _expect {
    private result: any
    private expectedToBe: Boolean
    constructor(cb: ArityAny, ...values:Array<any>) {
        this.result = call(cb, ...values)
        this.expectedToBe = true
    }

    get not() {
        this.expectedToBe = !this.expectedToBe
        return this
    }

    private XNOR (a:Boolean, b:Boolean) {
        return b ? a : !a
    }

    @boundMethod
    private toReturn (value:any) {
        return this.XNOR(value, this.expectedToBe)
    }

    @boundMethod
    private _toBe(value:any) {
        return this.result === value
    }
    public toBe(value:any) {
        return pipe(this._toBe, this.toReturn)(value) 
    }

    @boundMethod
    private _toEqual(value:any) {
        return equals(this.result, value)
    }
    public toEqual(value:any) {
        return pipe(this._toEqual, this.toReturn)(value) 
    }

    @boundMethod
    private _toBeAnyOf(...values:any) {
        return any(this._toBe)(values)
    }
    public toBeAnyOf(...values:any) {
        /*    ramda using pipe won't compile ts       */
        return this.toReturn(this._toBeAnyOf(...values))
    }

    @boundMethod
    private _toBeNoneOf(...values:any) {
        return none(this._toBe)(values)
    }
    public toBeNoneOf(...values:any) {
        return this.toReturn(this._toBeNoneOf(...values))
    }

    @boundMethod
    private _toBeFalsy() {
        return this._toBeAnyOf(...falsyValues)
    }
    public toBeFalsy() {
        return pipe(this._toBeFalsy, this.toReturn)() 
    }
    @boundMethod
    private _toBeTruthy() {
        return this._toBeNoneOf(...falsyValues)
    }
    public toBeTruthy() {
        return pipe(this._toBeTruthy, this.toReturn)() 
    }

    @boundMethod
    private _stringContaining(string:String) {
        return includes(string, this.result)
    }
    public stringContaining(string:String) {
        return pipe(this._stringContaining, this.toReturn)(string) 
    }

    @boundMethod
    private _arrayContaining(list:Array<any>) {
        return includes(list, this.result)
    }
    public arrayContaining(list:Array<any>) {
        return pipe(this._arrayContaining, this.toReturn)(list) 
    }
    
}

export const expect =(cb: ArityAny, ...values:Array<any>)  => new _expect(cb, ...values)