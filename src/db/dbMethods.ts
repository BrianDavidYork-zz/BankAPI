import {
    IConvertedNewAccountData, 
    IConvertedNewTransferData, 
    ICreateAccountResult, 
    ICreateTransferResult, 
    IViewBalanceResult, 
    IViewTransfersResult 
} from '../controllerTypings'
import { IAccount, IPerson, ITransfer } from './dataTypings'
import { saveToDisk } from '../helpers/utils'
const persons = require('./persons')
const accounts = require('./accounts')
const transfers = require('./transfers')

export function personExists (personId: number): boolean {
    return persons.find((person: IPerson) => person.id === personId) ? true : false
}

export function accountExists (accountId: number): boolean {
    return accounts.find((account: IAccount) => account.id === accountId) ? true : false
}

export function createNewAccount (accountObject: IConvertedNewAccountData): ICreateAccountResult {
    let responseData = null
    let responseErr = null

    // add id
    const newAccount: IAccount = {
        id: accounts.length + 1,
        ...accountObject
    }

    accounts.push(newAccount)

    try{
        saveToDisk('accounts', accounts)
    } catch (err: any) {
        responseErr = new Error('Account Could Not Be Created In The Database!')
    }

    responseData = newAccount.id

    return { data: responseData, error: responseErr}
}

export function createNewTransfer (transferObject: IConvertedNewTransferData): ICreateTransferResult {
    let responseData = null
    let responseErr = null

    // add money to acounts
    accounts.forEach((acct: IAccount) => {
        if (acct.id === transferObject.accountIdTo) {
            acct.balance += transferObject.amountTransferred
        }
    })

    // subtract money from account
    accounts.forEach((acct: IAccount) => {
        if (acct.id === transferObject.accountIdFrom) {
            acct.balance -= transferObject.amountTransferred
        }
    })

    try{
        saveToDisk('accounts', accounts)
    } catch (err: any) {
        responseErr = new Error('Transfer Record Could Not Be Created In The Database!')
    }

    // add id and insert new Transfer
    const newTransfer: ITransfer = {
        id: transfers.length + 1,
        ...transferObject
    }

    transfers.push(newTransfer)

    try{
        saveToDisk('transfers', transfers)
    } catch (err: any) {
        responseErr = new Error('Transfer Record Could Not Be Created In The Database!')
    }

    responseData = true

    return { data: responseData, error: responseErr}
}

export function getBalanceByAccountId (accountId: Number): IViewBalanceResult {
    let responseData = null
    let responseErr = null

    const result: IAccount | undefined = accounts.find((acc: IAccount) => {return acc.id === accountId})

    if (result === undefined) {
        responseErr = new Error('No Account With That ID Exists!')
    } else {
        responseData = result.balance
    }

    return { data: responseData, error: responseErr}
}

export function getTransfersByAccountId (accountId: Number): IViewTransfersResult {
    let responseData = null
    let responseErr = null

    const result: Array<ITransfer> | undefined = transfers.filter((transfer: ITransfer) => {
        return transfer.accountIdFrom === accountId || transfer.accountIdTo === accountId
    })

    if (result === undefined) {
        responseErr = new Error('No Account With That ID Exists!')
    } else {
        responseData = result
    }

    return { data: responseData, error: responseErr}
}