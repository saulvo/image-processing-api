# Image Processing API

## Project Summary

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## Project setup

Clone this repo and switch into the repo folder:

```bash
git clone https://github.com/saulvo/image-processing-api.git
cd image-processing-api
```

Install the dependencies for the server code.

### Set up the Express server

```bash
npm install
```

### Lint the code using Eslint

```bash
# Check
npm run lint
# Fix
npm run lint:fix
```

### Format the code using Prettier

```bash
# Check
npm run prettier
# Fix
npm run prettier:fix
```
### Build the app
```bash
npm run build
```

### Test the app using Jasmine
```bash
npm run test
```

### Now that everything is set up, you can test the app by starting the server using nodemon

```bash
npm run start
```

Server is running at [http://localhost:3000](http://localhost:3000).

You can access the api endpoint in the browser at [Click Here](http://localhost:3000/api/images?filename=palmtunnel&width=500&height=500).
