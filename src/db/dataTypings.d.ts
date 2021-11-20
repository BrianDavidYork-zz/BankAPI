export interface IPerson {
    id: number
    name: string
}

export interface IAccount {
    id: number
    ownerId: number
    balance: number
}
export interface ITransfer {
    id: number
    accountIdFrom: number
    accountIdTo: number
    amountTransferred: number
}

export interface IDatabaseObject {
    people: Array<IPerson>
    accounts: Array<IAccount>
    transfers: Array<ITransfer>
}