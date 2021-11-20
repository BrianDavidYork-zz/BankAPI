import { IConvertedNewAccountData, IConvertedNewTransferData, ICreateAccountResult, ICreateTransferResult, INewAccountData, IViewBalanceResult, IViewTransfersResult } from '../controllerTypings'
import { IAccount, ITransfer } from '../db/dataTypings'
// import * as persons from'../db/persons.json'
const accounts = require('../db/accounts.json')
const transfers = require('../db/transfers.json')
const fs = require('fs')

// validate Number

// fake DB calls
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

    responseData = true

    return { data: responseData, error: responseErr}
}

export function createNewTransfer (transferObject: IConvertedNewTransferData): ICreateTransferResult {
    let responseData = null
    let responseErr = null

    console.log(accounts)

    // add money to TO
    accounts.forEach((acct: IAccount) => {
        if (acct.id === transferObject.accountIdTo) {
            acct.balance += transferObject.amountTransferred
        }
    })

    // subtract money from FROM
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

const saveToDisk = (db: string, data: any) => {
    fs.writeFileSync(`./src/db/${db}.json`, JSON.stringify(data), 'utf-8')
  }
