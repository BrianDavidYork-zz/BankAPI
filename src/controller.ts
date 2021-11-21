import express from 'express'
import { 
    ICreateAccountResult, 
    IIdFreeTransfer, 
    INewAccountData, 
    IViewBalanceResult, 
    IViewTransfersResult 
} from './controllerTypings'
import { ITransfer } from './db/dataTypings'
import { isAPositiveWholeNumber } from './helpers/utils'
import {
    accountExists, 
    createNewAccount, 
    createNewTransfer, 
    getBalanceByAccountId, 
    getTransfersByAccountId, 
    personExists
} from './db/dbMethods'

export function createAccount (req: express.Request, res: express.Response) {
    const accountDetails: INewAccountData = req.body

    if (
        accountDetails.balance == undefined ||
        accountDetails.ownerId == undefined
    ) {
        return res.send({success: false, data: null, message: 'Please Provide An OwnerID And A Starting Account Balance!'}).status(400)
    }

    const accountOwnerExists: boolean = personExists(parseInt(accountDetails.ownerId))

    if (!accountOwnerExists) {
        return res.send({success: false, data: null, message: 'Please Provide A Valid OwnerID!'}).status(400)
    }

    if (!isAPositiveWholeNumber(accountDetails.balance)) {
        return res.send({success: false, data: null, message: 'Please Provide A Valid Account Balance!'}).status(400)
    }

    const convertedAccountDetails = {
        ownerId: parseInt(accountDetails.ownerId),
        balance: parseInt(accountDetails.balance)
    }

    const {data, error}: ICreateAccountResult = createNewAccount(convertedAccountDetails)

    // NEED TO RETURN ACCOUNT NUMBER
    
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

    const acctToExists: boolean = accountExists(parseInt(accountTo))
    const acctFromExists: boolean = accountExists(parseInt(accountFrom))

    if (!(acctToExists && acctFromExists)) {
        return res.send({success: false, data: null, message: 'Please Provide Valid AccountIDs!'}).status(400)
    }


    if (!isAPositiveWholeNumber(amountTransferred)) {
        return res.send({success: false, data: null, message: 'Please Provide A Valid Transfer Amount!'}).status(400)
    }

    // chack that accountFrom has enough money for transaction
    const acctFromBalance = getBalanceByAccountId(parseInt(accountFrom))

    if (acctFromBalance.data && (acctFromBalance.data < parseInt(amountTransferred))) {
        return res.send({success: false, data: null, message: 'Not Enough Money To Transfer!'}).status(400)
    }

    // convert all params to number
    const convertedTransferDetails = {
        accountIdTo: parseInt(accountTo),
        accountIdFrom: parseInt(accountFrom),
        amountTransferred: parseInt(amountTransferred)
    }

    const {data, error}: ICreateAccountResult = createNewTransfer(convertedTransferDetails)
    
    if (data) {
        return res.send({success: true, data: null, message: 'Money Successfully Transferred'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}

export function viewTransfers (req: express.Request, res: express.Response) {
    const accountId: string = req.params.acctId

    const acctExists: boolean = accountExists(parseInt(accountId))

    if (!acctExists) {
        return res.send({success: false, data: null, message: 'Please Provide A Valid AccountID!'}).status(400)
    }

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

    const acctExists: boolean = accountExists(parseInt(accountId))

    if (!acctExists) {
        return res.send({success: false, data: null, message: 'Please Provide A Valid AccountID!'}).status(400)
    }

    const {data, error}: IViewBalanceResult = getBalanceByAccountId(parseInt(accountId))

    if (data) {
        return res.send({success: true, data: data, message: 'Successfully Retrieved Balance'}).status(200)
    } else if (error) {
        return res.send({success: false, data: null, message: error.message})
    }
}
