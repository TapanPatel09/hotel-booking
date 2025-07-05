# Restaurant Listing & Review Web App

A full-stack Node.js web application that allows users to list restaurants, add reviews, and interact with dynamic content using EJS templating. Includes form validation, UI enhancements, and error handling.

## 🚀 Features

- ✅ Add, Edit, and Delete Restaurant Listings  
- ⭐ Leave reviews for each listing  
- 🎨 User-friendly interface with EJS and custom UI styling  
- ✅ Input validation with JOI (client + server-side)  
- ⚠️ Custom error handling  
- 🗃️ Modular folder structure for scalability  

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Validation**: JOI (Backend) + Custom Client-side  
- **Templating Engine**: EJS  

## 📁 Project Structure

```
.
├── init/                  # Initial database seed & configuration
│   ├── data.js
│   └── index.js
├── models/                # Mongoose schemas
│   ├── listing.js
│   └── review.js
├── public/                # Static assets (CSS, JS)
├── util/                  # Utility functions (e.g., error handler)
│   ├── expresserror.js
│   └── wrapsync.js
├── views/                 # EJS view templates
│   ├── includes/          # Navbar & Footer
│   ├── layouts/           # Main layout template
│   └── listing/           # Pages for listing CRUD & reviews
├── app.js                 # Main server file
├── schema.js              # JOI schema for validation
├── package.json
└── README.md
```

## 🖥️ How to Run

### 1. Clone the repository
```bash
git clone https://github.com/TapanPatel09/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install mongoose ejs ejs-mate express path method-override joi
```

### 3. Run the application
```bash
node app.js
```

> Make sure MongoDB is running on your local machine or update the DB URI in the config.

## 📌 Future Improvements

- 🔐 User authentication (Login/Signup)  
- 🗺️ Map integration for locations  
- 📱 Mobile responsive UI  

## 🙌 Author

**Tapan Patel**  
📧 [tapanpatel2630@gmail.com](mailto:tapanpatel2630@gmail.com)  
🔗 [GitHub - TapanPatel09](https://github.com/TapanPatel09)
