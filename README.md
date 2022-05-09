# count-ton 🚀

Project responsible for count ton site access and managing user in NodeJs with Typescript.

## Repository Technologies 👨‍💻 

- NodeJS
- NPM
- Jest

## Installation 👩‍💻

To install the project's dependencies, just run the command below:

```bash
$ npm install
```
## Before running the project locally...

Download e install MySQL locally in the following link:

https://dev.mysql.com/downloads/mysql/

After creating, add your setting data in the '.env' file

## Continuing in the .env file...

You can change the values of: JWT_SECRET, KEY_UTF8, IV_UTF8 

## Running the project locally 🏠

To run the project (including in mode `watch` (listening to changes)):

```bash
$ npm run start
```

## Running the unit tests 🧪

```bash
$ npm run test
```

## To access API documentation 📖

With the project running, open the following link in your browser:

http://localhost:3000/documentation/

## For everything to go right...

Just create your user, run the login endpoint, get your authorization token and create a key in 'api/v1/count-api/key', copy the key that comes on response and paste in .env file on the property 'COUNT_API_KEY', after that, it's up to you 😉