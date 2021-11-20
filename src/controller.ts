import express from 'express'
import { ICreateAccountResult, INewAccountData } from './controllerTypings'
import { createNewAccount, getBalanceByAccountId, getTransfersByAccountId } from './helpers/utils'

export function createAccount (req: express.Request, res: express.Response) {
    const accountDetails: INewAccountData = req.body
    // console.log(accountDetails)

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
    
    // res.json({status: 'success'})

    return res.send('okay')
}

// transferMoney

// view Transfers
export function viewTransfers (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check that balance is a positive whole number
    // check that account exists

    // call DB
    // const transfers: Array<ITransfer> = getTransfersByAccountId(parseInt(accountId))
    
    // res.json({transfers})

    return res
}

// viewBalance
export function viewBalance (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check that balance is a positive whole number

    // call DB
    // const balance: number = getBalanceByAccountId(parseInt(accountId))
    
    // res.json({balance})

    return res
}
