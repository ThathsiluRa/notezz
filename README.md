# 📝 Notes App

A modern, responsive note-taking application inspired by Apple Notes. Features include user authentication, real-time note editing, and dark mode support.

![Alt text](https://media-hosting.imagekit.io//4fcdf9e1f0334830/Screenshot%20.png?Expires=1835151358&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=s4eElldJW8P5BerEf26t2dKOkNxnpdMpf6AHE1Acu6HZkM2sf8HNl2SsAsWcmLF2L-FYZCYaRbFOG3U-VYD-zYgHmCzdSzpxwAk41wan2w24-7popv7XEEMQ5ZYtN0If2s3O3UpJ27IN5tanmOxTKvflUULnY1zpt9wkxOSqK-uoc00lNI~twkJNfiC1B9er-In00-AWmlgBuZDBcQlkvrX~UfoC59FsPd0rLIs7NqnUZoh65gA28JWz-wrWsFU~Rl-4-Jf4aVRGUbyBtcGXzCBbS9vZqMLw4mg7LWi7-9sIpaxrxU1sqdsxB3n64o3VXELeDVA5hGUEQsmw0ZnEjQ__)


## ✨ Features

- 🔐 User Authentication (Register/Login)
- 📝 Create, Read, Update, Delete Notes  
- 🌓 Dark Mode Support
- 💾 Automatic Saving
- 🎨 Clean, Minimal UI
- 📱 Responsive Design

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository**
git clone https://github.com/ThathsiluRa/notezz

2. Install dependencies:
```npm install```

3. Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/note-taking-app
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```npm start```

5. Visit `http://localhost:5000` in your browser

## API Documentation

### Authentication Endpoints

#### Register User
```POST /api/users/register```
Request body:
```
{
    "username": "string",
    "email": "string", 
    "password": "string"
}
```
Response:
```
{
    "_id": "string",
    "username": "string",
    "email": "string",
    "token": "string"
}
```

#### Login User
```POST /api/users/login```
Request body:
```
{
    "email": "string",
    "password": "string"
}
```
Response:
```
{
    "_id": "string",
    "username": "string", 
    "email": "string",
    "token": "string"
}
```

### Notes Endpoints

All notes endpoints require Authentication header:
```Authorization: Bearer <token>```

#### Get All Notes
```GET /api/notes```
Response:
```
[
    {
        "_id": "string",
        "title": "string",
        "content": "string",
        "user": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

#### Create Note
```POST /api/notes```
Request body:
```
{
    "title": "string",
    "content": "string"
}
```
Response:
```
{
    "_id": "string",
    "title": "string",
    "content": "string", 
    "user": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

#### Update Note
```PUT /api/notes/:id```
Request body:
```
{
    "title": "string",
    "content": "string"
}
```
Response:
```
{
    "_id": "string",
    "title": "string",
    "content": "string",
    "user": "string", 
    "createdAt": "date",
    "updatedAt": "date"
}
```

#### Delete Note
```DELETE /api/notes/:id```
Response:
```
{
    "message": "Note removed"
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error response format:
```
{
    "message": "Error description"
}
```

## Project Structure
```
note-taking-app/
├── config/
│   └── db.js
├── controllers/
│   ├── noteController.js
│   └── userController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Note.js
│   └── User.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── routes/
│   ├── noteRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── server.js
└── README.md
```

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Inspired by Apple Notes
- Icons by Font Awesome
- MongoDB Atlas for database hosting

## Contact
Email - thathsilura@gmail.com
Project Link: https://github.com/ThathsiluRa/notezz
