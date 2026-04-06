# 🚔 Police Station Management System (PSMS)

A web-based application to manage police station records including criminals, crimes, officers, complaints, and missing persons. This project is built using **Node.js, Express, PostgreSQL, HTML, and CSS**.

---

## 📌 Features

* 👤 Manage Criminal Records
* ⚖️ Track Crimes linked to criminals
* 👮 Manage Police Officers and their details
* 📄 Register and view Complaints
* 🚨 Missing Persons Module (with image upload)
* 🖼️ Store and display images using PostgreSQL (BYTEA)

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **File Upload:** Multer

---

## 🗄️ Database Tables

* `criminal` – Stores criminal details
* `crimes` – Stores crimes linked to criminals
* `police_officers` – Stores officer information
* `officer_details` – Additional officer data
* `complaint` – Complaint records
* `missing_persons` – Missing persons with images

---

## 🚀 How to Run the Project

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup PostgreSQL

* Create a database
* Run the SQL table queries

### 4️⃣ Configure database connection

Update your `index.js`:

```js
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_db",
  password: "your_password",
  port: 5432
});
```

### 5️⃣ Start the server

```bash
node index.js
```

### 6️⃣ Open in browser

```
http://localhost:3000
```

---

## 📂 Project Structure

```
/project
 ├── public/
 │   ├── css/
 │   └── images/
 ├── views/
 │   ├── complaint.ejs
 │   ├── missing.ejs
 │   └── ...
 ├── index.js
 ├── package.json
 └── README.md
```

---

## 🔥 Key Functionality

* Form submission using POST requests
* File upload using `multer`
* Store images in PostgreSQL using `BYTEA`
* Render data dynamically using EJS
* CRUD operations for multiple entities

---

## ⚠️ Note

* This project does **not include authentication** (can be added using JWT or sessions)
* Designed for **learning and academic purposes**

---

## 📈 Future Improvements

* Add authentication system (Admin / Officer roles)
* Add search & filtering
* Add dashboard analytics
* Improve UI with modern frameworks

---

## 👨‍💻 Author

**Anup Sawant**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
