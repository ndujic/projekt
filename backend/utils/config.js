require("dotenv").config();

const PORT = process.env.PORT;

// Baza podataka
const password = process.env.ATLAS_PASS;
const user = process.env.ATLAS_USER;
const dbname = process.env.NODE_ENV === "test" ? "racuni-test" : "racuni";
const DB_URI = `mongodb+srv://${user}:${password}@cluster0.qxgzze9.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = { PORT, DB_URI };
