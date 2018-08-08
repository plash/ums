import Dexie from "dexie";

const db = new Dexie("myDB");
db
  .version(1)
  .stores({ users: "++id, first_name, last_name, email, phone, dob, active" });

export default db;
