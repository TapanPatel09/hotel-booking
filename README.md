
# 🍽️ Restaurant Listing & Review Web App

A full-stack **Node.js** web application that allows users to **list restaurants**, **add reviews**, and interact with dynamic content using **EJS templating**. The project features **user authentication**, **Cloudinary image hosting**, **form validation**, and a **modular MVC structure** for scalability and maintainability.

---

## 🚀 Features

✅ Add, Edit, and Delete Restaurant Listings  
⭐ Leave reviews on listings  
👤 User Authentication using **Passport.js** (Register/Login/Logout)  
📦 Image upload support using **Multer + Cloudinary**  
🎨 EJS-based UI with Bootstrap & custom styling  
✅ Input validation with **Joi** (Client + Server-side)  
⚠️ Custom error handling with proper status codes  
🗃️ Modular folder structure following MVC pattern

---

## 🛠️ Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | HTML, CSS, JavaScript, EJS       |
| Backend     | Node.js, Express.js              |
| Database    | MongoDB (via Mongoose)           |
| Templating  | EJS + ejs-mate                   |
| Validation  | Joi + custom frontend validation |
| Auth        | Passport.js (Local Strategy)     |
| File Upload | Multer + Cloudinary              |

---

## 📁 Project Structure

\`\`\`
.
├── app.js                 # Main server file
├── cloudeConfig.js       # Cloudinary config
├── middlewere.js         # Middleware utilities
├── schema.js             # Joi validation schemas
├── init/                 # Database seed config
│   ├── data.js
│   └── index.js
├── models/               # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── controllers/          # Controller logic
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/               # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── util/                 # Reusable utils
│   ├── expresserror.js
│   └── wrapsync.js
├── public/               # Static files (CSS/JS)
├── uploads/              # Temporary uploaded images
├── views/                # EJS templates
│   ├── includes/
│   ├── layouts/
│   └── listing/
├── .env                  # Environment variables (❌ ignored via .gitignore)
├── .gitignore
├── package.json
└── README.md
\`\`\`

---

## 🖥️ How to Run the App

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/TapanPatel09/your-repo-name.git
cd your-repo-name
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

3. **Setup environment variables**

Create a `.env` file in the root directory:

\`\`\`env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DB_URL=mongodb://localhost:27017/your-db
SECRET=your_session_secret
\`\`\`

> `.env` is already listed in `.gitignore`, so it won’t be tracked by Git.

4. **Start the application**

\`\`\`bash
node app.js
\`\`\`

5. Visit: `http://localhost:3000`

---

## 🔐 Authentication

- Passwords are hashed using `passport-local-mongoose`
- Protected routes ensure only logged-in users can add/edit/delete listings or reviews

---

## 🖼️ Image Uploading

- Uses **Multer** for handling image uploads
- **Cloudinary** is used as the cloud storage solution
- Uploaded image URLs are stored in MongoDB

---

## 📌 Future Improvements

- 🗺️ Map integration for geolocation
- 📱 Responsive design for mobile devices
- 🧾 Admin panel for managing users and listings
- 🔍 Search and filter listings by location or rating

---

## 🙌 Author

**Tapan Patel**  
📧 tapanpatel2630@gmail.com  
🔗 GitHub: [TapanPatel09](https://github.com/TapanPatel09)

---

## 📄 License

This project is licensed under the MIT License.
