<div align="center">

# Ami Coding Pari Na
</div>

---
Assessment by Evident BD Ltd. for the post of Junior Software Engineer (Python Backend)

### Setup

- Make sure you have `node v16` or above & `npm` installed in your system.
- Clone the repository and run `npm i` to install all the dependencies.
- Run `npm start` to start the server.

See live demo [here](https://13.232.187.132/)

### Section 0: Tech Stack

- HTML & CSS
- Node.js
- Express.js
- MongoDB


### Section 1: Routes

#### 1.1: User Routes
- `GET /` - Gives main page
- `GET /login` - Gives login page
- `GET /register` - Gives register page
- `GET /api/get/:userID` - Returns user data of the given userID
- `GET /api/me` - Returns user data of the logged in user

#### 1.2: API Routes
- `POST /api/login` - Logs in the user and return `token` & `name` in response
- `POST /api/register` - Registers the user and redirects to login page

