const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const path = require("path");
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const port = 3000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "police_station",
  password: "root",
  port: 5432,
});

app.get("/home", (req, res) => {
  res.render("index.ejs");
});

//show complaints
app.get("/complaints/show", async (req, res) => {
  let q = "SELECT * FROM complaint";

  try {
    const result = await pool.query(q);
    const data = result.rows;

    res.render("showComplaints.ejs", { data });
  } catch (err) {
    console.log(err);
  }
});

//register complaint
app.get("/complaints/register", (req, res) => {
  res.render("registerComplaints.ejs");
});

app.post("/complaints/register", async (req, res) => {
  let {
    complainant_name,
    complainant_contact,
    complainant_address,
    complaint_type,
    incident_date,
    incident_location,
  } = req.body;
  let q = `
        INSERT INTO complaint 
        (complainant_name, complainant_contact, complainant_address, complaint_type, incident_date, incident_location)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

  // handle empty date
  incident_date = incident_date || null;

  try {
    await pool.query(q, [
      complainant_name,
      complainant_contact,
      complainant_address,
      complaint_type,
      incident_date,
      incident_location,
    ]);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/complaints/show");
});

//show officers

app.get("/officers/show", async (req, res) => {
  let q = "SELECT * FROM police_officers ";
  try {
    const result = await pool.query(q);
    let data = result.rows;

    res.render("showOfficers.ejs", { data });
  } catch (err) {}
});

//Add Officer
app.get("/officers/register", (req, res) => {
  res.render("registerOfficer.ejs");
});

app.post("/registerOfficer", async (req, res) => {
  let {
    first_name,
    last_name,
    rank,
    badge_number,
    department,
    contact_number,
    email,
    joining_date,
  } = req.body;

  let q = `
       INSERT INTO police_officers 
(first_name, last_name, rank, badge_number, department, contact_number, email, joining_date)
VALUES 
($1,$2,$3,$4,$5,$6,$7,$8);
 `;

  joining_date = joining_date || null;
  try {
    await pool.query(q, [
      first_name,
      last_name,
      rank,
      badge_number,
      department,
      contact_number,
      email,
      joining_date,
    ]);
  } catch (err) {
    console.log("cannot inserted");
  }

  res.redirect("/officers/show");
});

app.get("/missing/add",(req,res)=>{
  res.render("missingAdd");
});

app.post("/missing/add", upload.single("image"), async (req, res) => {
    try {
        console.log(req.body); // debug
        console.log(req.file); // debug

        const {
            name,
            age,
            gender,
            last_seen_date,
            last_seen_location,
            description,
            contact_person,
            contact_number
        } = req.body;

        const image = req.file ? req.file.buffer : null;

        await pool.query(
            `INSERT INTO missing_persons
            (name, age, gender, last_seen_date, last_seen_location,
             description, contact_person, contact_number, image)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            [
                name,
                age,
                gender,
                last_seen_date,
                last_seen_location,
                description,
                contact_person,
                contact_number,
                image
            ]
        );

        res.send("/missing/show");

    } catch (err) {
        console.error(err);
        
    }
});

//show missinhg
app.get("/missing/show", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM missing_persons ORDER BY missing_id DESC");

        res.render("missingShow.ejs", { data: result.rows });

    } catch (err) {
        console.log(err);
        
    }
});

app.get("/show/criminals",async (req,res)=>{
  let q=`select * from criminal`;

  try{
    const result=await pool.query(q);
    const data = result.rows;
    // console.log(data);
  

    res.render("showCriminals.ejs", { data });
  }catch(err){
    console.log(err);
  };

});


app.get("/register/criminal",(req,res)=>{
  res.render("registerCriminal.ejs");
});

app.post("/criminals/add", async (req, res) => {
    const {
        first_name,
        last_name,
        gender,
        date_of_birth,
        address,
        contact_number,
        identification_mark
    } = req.body;

    try {
        await pool.query(
            `INSERT INTO criminal 
            (first_name, last_name, gender, date_of_birth, address, contact_number, identification_mark)
            VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [first_name, last_name, gender, date_of_birth, address, contact_number, identification_mark]
        );

        res.redirect("/show/criminals");
    } catch (err) {
       
        res.send("Error inserting data");
    }
});


app.listen(port, () => {
  console.log("Server is Started");
});
