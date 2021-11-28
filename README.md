BRIAN'S BANK API

This Api has 4 endpoints:

  (1) GET   api/account/<account id>
    This takes in an account id and returns the current balance of the account
    Account id must belong to an existing account
  
  
  (2) POST  api/account
    This creates a new account
    Requires a POST body containing:
      balance: (a whole, positive number)
      ownerId: (the id of the person associated with the account
    The owner id must belong to an existing person (1, 2, 3, or 4)
    All values in the post body must be strings
    
  
  (3) GET   api/transfer/<account id>
    This takes in an account id and returns all transfers associated with the account
    Account id must belong to an existing account
    
    
  (4) PUT   api/transfer/<id of account paying>/<id of account being payed>/<amount>
    This takes in two account ids and an quantitiy of the money being transferred
    Both account ids must belong to existing accounts
    You cannot transfer money to and from the same account
    The amount of money being transferred ust be less than or equal to the available balance in the account from which the money is being transferred
    
    
  All responses from this API will be an object with the follwing structure:
  {
    success: (true or false)
    data: (any data returned)
    message: (any message being returned)
  }
    
