# Atmproject
This is a project with a smart contract written in solidity that contains functions like withdraw,deposit,multiply and get balance whose output can be seen in the frontend app.

## Description

This program is written in solidity, react.js and ether.js . The program has the following functions :-

* The user will be able to check its metamask wallet balance after connecting it successfully.

* The user can withdraw from his/her account using the withdraw function with a value of 1,2 and 4.

* The user can deposit in his metamask account using the deposit function with value of 1,2 and 4.

* The user is able to directly double its account balance using the multiply function.

## Getting Started

### Executing program

(1) Cloning the github repository : 

```bash
git clone https://github.com/heyakash876/Atmproject.git
```

(2) Install the required dependencies

```bash
npm i
```

(3) Open two extra terminals in your VS code, 
 
(4) In the second terminal type:
```bash
npx hardhat node
```
   
(5) In the third terminal, type:
```bash
npx hardhat run --network localhost scripts/deploy.js.
```
After this command you will get a prompt of a port directly click on make public.
(6) Now, go back to the first terminal and type:
```bash
npm run dev
```

(7) Once you are done just open the local host and you will be able to interact with the Dapp.

```bash
http://localhost:3000
```

## Author
Akash
Email: vermakash876@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for detail




s
