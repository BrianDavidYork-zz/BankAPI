import { IConvertedNewAccountData, ICreateAccountResult, INewAccountData, IViewBalanceResult, IViewTransfersResult } from '../controllerTypings'
import { IAccount, ITransfer } from './dataTypings'
import * as data from'./fakeDB.json'
const fs = require('fs')

// Api standrdized Response
    // Message
    // status
    // Data

// validate Number

// fake DB calls
export function createNewAccount (accountObject: IConvertedNewAccountData): ICreateAccountResult {
    let responseData = null
    let responseErr = null

    // add id
    const newAccount: IAccount = {
        id: data.accounts.length + 1,
        ...accountObject
    }

    console.log(newAccount)

    data.accounts.push(newAccount)

    try{
        saveToDisk()
    } catch (err: any) {
        responseErr = new Error('Account Could Not Be Created In The Database!')
    }

    responseData = true

    return { data: responseData, error: responseErr}
}

export function getBalanceByAccountId (accountId: Number): IViewBalanceResult {
    let responseData = null
    let responseErr = null

    const accounts: Array<IAccount> = data.accounts

    const result: IAccount | undefined = accounts.find((acc: IAccount) => {return acc.id === accountId})

    if (result === undefined) {
        responseErr = new Error('No Account With That ID Exists!')
    } else {
        responseData = result.balance
    }

    return { data: responseData, error: responseErr}
}
    
    // transferMoney

export function getTransfersByAccountId (accountId: Number): IViewTransfersResult {
    let responseData = null
    let responseErr = null

    const transfers: Array<ITransfer> = data.transfers

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

const saveToDisk = () => {
    fs.writeFileSync('./src/helpers/fakeDB.json', JSON.stringify(data), 'utf-8')
  }
