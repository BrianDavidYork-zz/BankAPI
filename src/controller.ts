import express from 'express'
import { ICreateAccountResult, IIdFreeTransfer, INewAccountData, IViewBalanceResult, IViewTransfersResult } from './controllerTypings'
import { ITransfer } from './db/dataTypings'
import { createNewAccount, createNewTransfer, getBalanceByAccountId, getTransfersByAccountId } from './helpers/utils'

export function createAccount (req: express.Request, res: express.Response) {
    const accountDetails: INewAccountData = req.body

    // check for ownerId in body
    // check for balance in body
    // check that owner exists
    // check that balance is a positive whole number

    // convert both to number
    const newAccountDetails = {
        ownerId: parseInt(accountDetails.ownerId),
        balance: parseInt(accountDetails.balance)
    }

    // call DB
    const {data, error}: ICreateAccountResult = createNewAccount(newAccountDetails)
    
    if (data) {
        return res.send({success: true, data: null, message: 'Account Successfully Created'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}

export function transferMoney (req: express.Request, res: express.Response) {
    const accountTo: string = req.params.acctIdTo
    const accountFrom: string = req.params.acctIdFrom
    const amountTransferred: string = req.params.amount

    // check for all params

    // check that both accounts exists

    // check that balance is a positive whole number

    // chack that accountFrom has enough money for transaction

    // convert all params to number
    const newTransferDetails = {
        accountIdTo: parseInt(accountTo),
        accountIdFrom: parseInt(accountFrom),
        amountTransferred: parseInt(amountTransferred)
    }

    // call DB
    const {data, error}: ICreateAccountResult = createNewTransfer(newTransferDetails)
    
    if (data) {
        return res.send({success: true, data: null, message: 'Money Successfully Transferred'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}

export function viewTransfers (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check that account is a positive whole number
    // check that account exists

    // call DB
    const {data, error}: IViewTransfersResult = getTransfersByAccountId(parseInt(accountId))

    if (data) {
        // remove id from transfer records
        const idFreeData = data.map((record: ITransfer) => {
            const newRecord: IIdFreeTransfer = {
                accountIdTo: record.accountIdTo,
                accountIdFrom: record.accountIdFrom,
                amountTransferred: record.amountTransferred
            }

            return newRecord
        })
        return res.send({success: true, data: idFreeData, message: 'Successfully Retrieved Transfers'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}

export function viewBalance (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check that accountId is a positive whole number
    // check that account exists

    // call DB
    const {data, error}: IViewBalanceResult = getBalanceByAccountId(parseInt(accountId))

    if (data) {
        return res.send({success: true, data: data, message: 'Successfully Retrieved Balance'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}
