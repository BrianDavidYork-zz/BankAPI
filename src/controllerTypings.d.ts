import { ITransfer } from './db/dataTypings'

export interface IViewTransfersResult {
    data: Array<ITransfer> | null
    error: Error | null
}

export interface IViewBalanceResult {
    data: number | null
    error: Error | null
}

export interface ICreateAccountResult {
    data: number | null
    error: Error | null
}

export interface ICreateTransferResult {
    data: boolean | null
    error: Error | null
}

export interface INewTransferData {
    accountIdTo: string
    accountIdFrom: string
    amountIdTransferred: string
}

export interface IConvertedNewTransferData {
    accountIdTo: number
    accountIdFrom: number
    amountTransferred: number
}

export interface IIdFreeTransfer {
    accountIdFrom: number
    accountIdTo: number
    amountTransferred: number
}

export interface INewAccountData {
    ownerId: string
    balance: string
}

export interface IConvertedNewAccountData {
    ownerId: number
    balance: number
}