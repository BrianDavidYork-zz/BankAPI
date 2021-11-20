import { IAccount, ITransfer } from './data'
import * as data from'./fakeDB.json'

// Api standrdized error
    // Message
    // Data


// fake DB calls
    // createAccount

export function getBalanceByAccountId (accountId: Number) {
    const accounts: Array<IAccount> = data.accounts

    const result: IAccount | undefined = accounts.find((acc: IAccount) => {return acc.id === accountId})

    if (result === undefined) {
        throw new Error('No Account With That ID Exists!')
    } else {
        return result.balance
    }
}
    
    // transferMoney

export function getTransfersByAccountId (accountId: Number) {
    const transfers: Array<ITransfer> = data.transfers

    const result: Array<ITransfer> | undefined = transfers.filter((transfer: ITransfer) => {
        return transfer.accountIdFrom === accountId || transfer.accountIdTo === accountId
    })

    if (result === undefined) {
        throw new Error('No Account With That ID Exists!')
    } else {
        return result
    }
}

// validate Number