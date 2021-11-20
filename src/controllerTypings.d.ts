import { ITransfer } from './helpers/dataTypings'

export interface IViewTransfersResult {
    data: Array<ITransfer> | null
    error: Error | null
}

export interface IViewBalanceResult {
    data: number | null
    error: Error | null
}

export interface ICreateAccountResult {
    data: boolean | null
    error: Error | null
}

export interface ITransferMoneyResult {
    data: boolean | null
    error: Error | null
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