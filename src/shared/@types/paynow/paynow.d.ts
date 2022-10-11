import { Paynow, Payment, InitResponse,StatusResponse } from "./paynow";

export type Cart={
    items:[]
}

export class Payment{
    reference: string
    authEmail: string
    items:Cart

    constructor(reference: string,authEmail: string,items?:Cart);

    add(title: any, amount: any, quantity?: any): Payment
    info(): any
    total(): any

}

export  declare class Paynow{
    integrationId: string
    integrationKey: string
    resultUrl: string
    returnUrl: string

    constructor(integrationId: string,integrationKey: string,resultUrl?: string,returnUrl?: string)

    createPayment(reference:string, authEmail?:string):Payment;
    build(payment: Payment): { resulturl: any; returnurl: any; reference: any; amount: any; id: any; additionalinfo: any; authemail: any; status: string; }
    buildMobile(payment: Payment, phone: any, method: any): { resulturl: any; returnurl: any; reference: any; amount: any; id: any; additionalinfo: any; authemail: any; phone: any; method: any; status: string; }
    createPayment(reference: any, authEmail: any): Payment
    fail(message: any)
    generateHash(values: any, integrationKey: any): any
    init(payment: Payment): Promise<void | InitResponse | null>
    parse(response: any): InitResponse | null
    initMobile(payment: any, phone: any, method: any): Promise<void | InitResponse | null>
    parseQuery(queryString: any): {}
    parseStatusUpdate(response: any): StatusResponse
    pollTransaction(url: any): Promise<InitResponse | null>
    send(payment: Payment): Promise<void | InitResponse | null>
    sendMobile(payment: Payment, phone: any, method: any): Promise<void | InitResponse | null>
    urlDecode(url: any): string
    urlEncode(url: any): string
    validate(payment: Payment): void
    verifyHash(values: any): boolean
}
// export function PaynowGw(id:string, key:string, resultUrl?:string,returnUrl?:string):Payment;