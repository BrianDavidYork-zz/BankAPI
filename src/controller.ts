import express from 'express'
import { ITransfer } from './helpers/data'
import { getBalanceByAccountId, getTransfersByAccountId } from './helpers/utils'
// createAccount

// transferMoney

// view Transfers
export function viewTransfers (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check for numbers only
    // check that account exists

    // call DB
    const transfers: Array<ITransfer> = getTransfersByAccountId(parseInt(accountId))
    
    res.json({transfers})

    return res
}

// viewBalance
export function viewBalance (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check for numbers only

    // call DB
    const balance: number = getBalanceByAccountId(parseInt(accountId))
    
    res.json({balance})

    return res
}
