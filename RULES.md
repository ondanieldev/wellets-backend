# [ USERS ]

## Sign up

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to register;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] the email must not be case sensitive;
- [x] the password must be encrypted;

**BUSINESS RULES**

- [x] it is not possible to register with an email that is already in use;
- [x] the password must be greater than or equal to 6 characters;

## Sign in

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to sign in;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] a JWT token must be generated and stored in the database;

**BUSINESS RULES**

- [x] it is not possible to sign in with an invalid email and password;

# [ CURRENCIES ]

## Update currencies rates

**FUNCTIONAL REQUIREMENTS**

- [x] the system must automatically update currency rates every hour;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] a migration must be runned to create the currencies at the beginning of the project;

# [ WALLETS ]

## Create wallet

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to create a wallet;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] the user cannot have two wallets with the same alias;
- [x] the wallet must have a valid currency;
- [x] the balance must be positive;

## Index user wallets

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to index all their wallets;

**BUSINESS RULES**

- [x] the user must be authenticated;

## Delete wallet

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to delete a wallet;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] only the owner can delete their wallet;

# [ ROAD MAP ]

- [ ] users: log out;
- [ ] currencies: log syncs;
- [ ] currencies: index currencies;
