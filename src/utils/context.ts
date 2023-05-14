import { Request } from 'express';
import jwt from 'jsonwebtoken'

interface IValues {
    [key: string]: any
}


class Values {
    public values: IValues;

    constructor() {
        this.values = {}
    }

    /**
     * set
     */
    public set(key: string, value: any) {
        this.values[key] = value
    }

    /**
     * get
     */
    public get(key: string): any {
        return this.values[key]
    }


}


export default class Context {
    static _bindings = new WeakMap<Request, Values>();

    static bind(req: Request): void {
        const ctx = new Values();

        Context._bindings.set(req, ctx);
    }

    

    static get(req: Request): Values | null {
        return Context._bindings.get(req) || null;
    }
}