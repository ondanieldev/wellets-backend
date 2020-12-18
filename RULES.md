# [ USERS ]

## Sign up

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to sign up;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] the email must not be case sensitive;
- [x] the password must be encrypted;

**BUSINESS RULES**

- [x] it is not possible to sign up with an email that is already in use;
- [x] the password must be greater than or equal to 6 characters;

## Sign in

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to sign in;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] a JWT token must be generated and stored in the database;

**BUSINESS RULES**

- [x] it is not possible to sign in with an invalid email and password;

## Sign out

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to sign out;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] the user's token must be deleted from the database;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] the user cannot log out another user;

# [ CURRENCIES ]

## Create currencies

**NON-FUNCTIONAL REQUIREMENTS**

- [x] a migration must be runned to create the currencies at the beginning of the project;

## Update currencies rates

**NON-FUNCTIONAL REQUIREMENTS**

- [x] the system must automatically update currency rates every hour;

## Index currencies

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to index all currencies to be able to attach any of them their wallet;

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

**NON-FUNCTIONAL REQUIREMENTS**

- [x] wallets list must be cached;

**BUSINESS RULES**

- [x] the user must be authenticated;

## Delete wallet

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to delete a wallet;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] only the owner can delete their wallet;

# [ TRANSACTIONS ]

## Add or remove money from wallet

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to add or remove money from their wallet through a transaction;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] the wallet must exist;
- [x] the user must be the owner of the wallet;
- [x] the wallet balance must be updated;

## Index wallet transactions

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to list all transactions of their wallet;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] the list must be cached;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] the wallet must exist;
- [x] the user must be the owner of the wallet;

# [ CONVERSIONS ]

## Create conversion between two wallets

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to set up a conversion between two of their wallets;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] the wallets must exist;
- [x] the user must be the owner of the both wallets;
- [x] rates must be positive values;
- [x] it is not possible to create another conversion between the same wallets with the same positions;

## Index wallet conversions

**FUNCTIONAL REQUIREMENTS**

- [x] the user must be able to list all conversions that involves their wallet;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] the list must be cached;

**BUSINESS RULES**

- [x] the user must be authenticated;
- [x] the wallet must exist;
- [x] the user must be the owner of the wallet;
