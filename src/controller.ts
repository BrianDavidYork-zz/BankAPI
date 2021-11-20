import express from 'express'
import { ICreateAccountResult, IIdFreeTransfer, INewAccountData, IViewBalanceResult, IViewTransfersResult } from './controllerTypings'
import { ITransfer } from './helpers/dataTypings'
import { createNewAccount, getBalanceByAccountId, getTransfersByAccountId } from './helpers/utils'

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

// transferMoney

export function viewTransfers (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check that balance is a positive whole number
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

    // check that balance is a positive whole number

    // call DB
    const {data, error}: IViewBalanceResult = getBalanceByAccountId(parseInt(accountId))

    if (data) {
        return res.send({success: true, data: data, message: 'Successfully Retrieved Balance'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}
