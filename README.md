<div align="center">

# Ami Coding Pari Na
</div>

---
Assessment by Evident BD Ltd. for the post of Junior Software Engineer (Python Backend)

### Setup

- Make sure you have `node` & `npm` installed in your system.
- Clone the repository and run `npm i` to install all the dependencies.
- Run `npm start` to start the server.


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
- `GET /api/get/:username` - Gives user data of the given username

#### 1.2: API Routes
- `POST /api/login` - Logs in the user and return `token` & `name` in response
- `POST /api/register` - Registers the user and redirects to login page

