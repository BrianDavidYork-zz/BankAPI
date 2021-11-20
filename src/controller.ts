import express from 'express'
import { getBalanceByAccountId } from './helpers/utils'
// createAccount

// transferMoney

// view Transfers

// viewBalance
export function viewBalance (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    // check for numbers only

    // call DB
    const balance: number = getBalanceByAccountId(parseInt(accountId))
    
    res.json({balance})

    return res
}
