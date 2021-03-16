# MyPLS

## Overview
MyPLS is a course shell that allows both professors and students to access their respective course content in an online environment

## Authors
* Kenny Scott
* Sayed Mobin
* Dominick Reba
* Aidan LeMay

## Technologies Used
* MySQL
* NodeJS
* Typescript
* HTML
* CSS

## Installation Instructions
* Clone repository to machine
* Use `npm i` to install any dependencies
* Run the MySQL script to create database
* type `npm run start` to start things
* navigate to http://localhost:5000 to view it
* to modify things, modify the code in `src/client` or `src/server` (whichever you're working on) and type `npm run build` when you're done. 

### Typescript

I have converted this repository to use [typescript](https://www.typescriptlang.org/) - which is just javascript but with type annotations. These allow developers to annotate their code and have their code editors (in my case, [visual studio code](https://code.visualstudio.com/)) provide detailed autocompletion information about what does what.

### Rollup

Because we use typescript now, we'll need to transpile our code to javascript before the browser can understand it. To do this I use a npm package called Rollup. This is configured in the `rollup.config.js` file. This way, all we need to do to compile everything to javascript and put it in the proper location is type `npm run build`.
