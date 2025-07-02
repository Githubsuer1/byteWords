# 📝 ByteWords

**ByteWords** is a full-stack blog platform where users can create, read, update, and delete blog posts. The platform includes secure authentication, image uploads via Cloudinary, and a responsive modern UI powered by Tailwind CSS. Built with the MERN stack and Redux Toolkit for state management, ByteWords is designed to be scalable, clean, and developer-friendly.

---

## 🚀 Live Demo

🔗 [Live Demo Coming Soon](https://your-live-link-here.com)

---

## ✨ Features

- 🔐 User Authentication (JWT-based)
- 📝 Create, Edit, Delete Blogs
- 📃 View Single Blog and All Blogs
- 🌄 Image Upload via Cloudinary (Handled on Frontend; only URL is sent to Backend)
- ⚙️ Protected Routes (Only authorized users can post/edit/delete)
- 🔄 Redux Toolkit for global state management
- 💡 Responsive design with Tailwind CSS


---

## 🛠️ Tech Stack

### Frontend:
- JavaScript
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)

### Image Handling:
Image uploads are managed entirely on the frontend using Cloudinary's unsigned upload preset. When a user selects an image:

1. The image is uploaded directly from the browser to Cloudinary.
2. Cloudinary returns a secure image URL.
3. This URL is included in the blog post data and sent to the backend.
4. The backend saves the blog post along with the image URL in the MongoDB database.

> ⚠️ No actual image files are sent to or handled by the backend server.


---

## 📁 Folder Structure Overview

bytewords/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/ # Redux Toolkit slices
│ │ ├── App.js
│ │ └── index.js
│ └── tailwind.config.js
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── server.js
├── .env
└── README.md

---


---

## ⚙️ Installation & Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bytewords.git
cd bytewords


2. Set up the backend
cd server
npm install express mongoose jsonwebtoken cors body-parser


Create a .env file inside the server folder and add the following:

PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key



Start the server:

npm run dev


3. Set up the frontend

cd ../client
npm install


Start the React development server:

npm run dev

🔐 Environment Variables
Ensure the following environment variables are set for proper functioning:

Backend .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


📸 Screenshots

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Siddhant Mishra
📧 Email: your.email@example.com
🌐 Portfolio: your-portfolio-link.com
📱 LinkedIn: linkedin.com/in/yourprofile

Made with 💻 + ☕ by Siddhant Mishra


---

✅ Just open or create a file named `README.md` in the root of your project and paste this content.

Let me know if you want to include actual image links or live project URLs.



