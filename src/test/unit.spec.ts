import * as controller from '../controller'
import * as dbMethods from '../db/dbMethods'
import * as utils from '../helpers/utils'
import { Request, Response} from 'express'
jest.mock('../db/dbMethods')
jest.mock('../helpers/utils')


describe('API unit tests', () => {
    const mockResponse = () => {
        const res = {} as Response
        res.status = jest.fn().mockReturnValue(res)
        res.send = jest.fn().mockReturnValue(res)
        return res
    }

    test('viewTransfers Success', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getTransfersByAccountId.mockReturnValueOnce({
            data: [
                {
                    id: 5,
                    accountIdFrom: 3,
                    accountIdTo: 4,
                    amountTransferred: 100
                },
                {
                    id: 7,
                    accountIdFrom: 3,
                    accountIdTo: 1,
                    amountTransferred: 30
                }
            ],
            error: null
        })

        const req = {params: {acctId: 3}} as any as Request
        const res = mockResponse()
        controller.viewTransfers(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: true,
            data: [
                {
                    accountIdFrom: 3,
                    accountIdTo: 4,
                    amountTransferred: 100
                },
                {
                    accountIdFrom: 3,
                    accountIdTo: 1,
                    amountTransferred: 30
                }
            ],
            message: 'Successfully Retrieved Transfers'
        })
    })

    test('viewTransfers Fail - Account does not exist', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(false)

        const req = {params: 3} as any as Request
        const res = mockResponse()
        controller.viewTransfers(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide A Valid AccountID!'
        })
    })

    test('viewTransfers Fail - Db error', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getTransfersByAccountId.mockReturnValueOnce({
            data: null,
            error: new Error('DB ERROR')
        })

        const req = {params: 3} as any as Request
        const res = mockResponse()
        controller.viewTransfers(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'DB ERROR'
        })
    })

    test('viewBalance Success', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getBalanceByAccountId.mockReturnValueOnce({
            data: 500,
            error: null
        })

        const req = {params: 1} as any as Request
        const res = mockResponse()
        controller.viewBalance(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: true,
            data: 500,
            message: 'Successfully Retrieved Balance'
        })
    })

    test('viewBalance Fail - Account does not exist', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(false)

        const req = {params: 1} as any as Request
        const res = mockResponse()
        controller.viewBalance(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide A Valid AccountID!'
        })
    })

    test('viewBalance Fail - DB error', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getBalanceByAccountId.mockReturnValueOnce({
            data: null,
            error: new Error('DB ERROR')
        })

        const req = {params: 1} as any as Request
        const res = mockResponse()
        controller.viewBalance(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'DB ERROR'
        })
    })

    test('createAccount Success', () => {
        // @ts-ignore
        dbMethods.personExists.mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.createNewAccount.mockReturnValueOnce({
            data: 5,
            error: null
        })

        const req = {
            body: {
                ownerId: 1, 
                balance: 75,
            },
        } as Request
        const res = mockResponse()

        controller.createAccount(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: true,
            data: 'Account number: 5',
            message: 'Account Successfully Created'
        })
    })

    test('createAccount Fail - wrong fields in body', () => {
        const req = {
            body: {
                accountId: 1,
            },
        } as Request
        const res = mockResponse()

        controller.createAccount(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide An OwnerID And A Starting Account Balance!'
        })
    })

    test('createAccount Fail - Person does not exist', () => {
        // @ts-ignore
        dbMethods.personExists.mockReturnValueOnce(false)

        const req = {
            body: {
                ownerId: 1, 
                balance: 75,
            },
        } as Request
        const res = mockResponse()

        controller.createAccount(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide A Valid OwnerID!'
        })
    })

    test('createAccount Fail - Invalid starting account balance', () => {
        // @ts-ignore
        dbMethods.personExists.mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(false)

        const req = {
            body: {
                ownerId: 1, 
                balance: 75,
            },
        } as Request
        const res = mockResponse()

        controller.createAccount(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide A Valid Account Balance!'
        })
    })

    test('createAccount Fail - DB error', () => {
        // @ts-ignore
        dbMethods.personExists.mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.createNewAccount.mockReturnValueOnce({
            data: null,
            error: new Error('DB ERROR')
        })

        const req = {
            body: {
                ownerId: 1, 
                balance: 75,
            },
        } as Request
        const res = mockResponse()

        controller.createAccount(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'DB ERROR'
        })
    })

    test('transferMoney Success', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getBalanceByAccountId.mockReturnValueOnce({
            data: 500,
            error: null
        })
        // @ts-ignore
        dbMethods.createNewTransfer.mockReturnValueOnce({
            data: 'okay',
            error: null
        })

        const req = {
            params: {
                acctIdTo: 3,
                acctIdFrom: 5,
                amount: 350
            }
        } as any as Request
        const res = mockResponse()

        controller.transferMoney(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: true,
            data: null,
            message: 'Money Successfully Transferred'
        })
    })

    test('transferMoney Fail - same account', () => {
        const req = {
            params: {
                acctIdTo: 3,
                acctIdFrom: 3,
                amount: 350
            }
        } as any as Request
        const res = mockResponse()

        controller.transferMoney(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide Two Different AccountIDs!'
        })
    })

    test('transferMoney Fail - account does not exist', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        .mockReturnValueOnce(false)

        const req = {
            params: {
                acctIdTo: 3,
                acctIdFrom: 5,
                amount: 350
            }
        } as any as Request
        const res = mockResponse()

        controller.transferMoney(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide Valid AccountIDs!'
        })
    })

    test('transferMoney Fail - bad transaction amount', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(false)

        const req = {
            params: {
                acctIdTo: 3,
                acctIdFrom: 5,
                amount: 350
            }
        } as any as Request
        const res = mockResponse()

        controller.transferMoney(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Please Provide A Valid Transfer Amount!'
        })
    })

    test('transferMoney Fail - not enough money', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getBalanceByAccountId.mockReturnValueOnce({
            data: 50,
            error: null
        })


        const req = {
            params: {
                acctIdTo: 3,
                acctIdFrom: 5,
                amount: 350
            }
        } as any as Request
        const res = mockResponse()

        controller.transferMoney(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'Not Enough Money To Transfer!'
        })
    })

    test('transferMoney Fail - db error', () => {
        // @ts-ignore
        dbMethods.accountExists.mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        // @ts-ignore
        utils.isAPositiveWholeNumber.mockReturnValueOnce(true)
        // @ts-ignore
        dbMethods.getBalanceByAccountId.mockReturnValueOnce({
            data: 500,
            error: null
        })
        // @ts-ignore
        dbMethods.createNewTransfer.mockReturnValueOnce({
            data: null,
            error: new Error('DB ERROR')
        })

        const req = {
            params: {
                acctIdTo: 3,
                acctIdFrom: 5,
                amount: 350
            }
        } as any as Request
        const res = mockResponse()

        controller.transferMoney(req, res)

        expect(res.send).toHaveBeenCalledWith({
            success: false,
            data: null,
            message: 'DB ERROR'
        })
    })
})
