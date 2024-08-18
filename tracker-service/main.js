const express = require('express')
const cors = require("cors");
const fs = require('fs');

// 
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// 

//

app.get("/article", (req, res) => {

  res.json([
    { id: 1, title: "CRUD", name: "C" },
    { id: 2, title: "Create", name: "R" },
    { id: 3, title: "Read", name: "U" },
    { id: 4, title: "Delete", name: "D" },
  ]);
});




// Read from file system
const content = fs.readFileSync("accounts.json", "utf-8");
let accounts = JSON.parse(content);

// CRUD:Read 
app.get("/accounts/list", (req, res) => {
  res.json(accounts);
});



//
//CRUD:Create
app.post("/accounts/create", (req, res) => {
  //   console.log(req.params);
  //   console.log(req.query);
  //   accounts.push({ title: "new accounts", name: "saraa" });
  //   res.json("SUCCESS");
  const { title } = req.body;
  const { name } = req.body;
  console.log("=== Where is req.body ===",req.body);
  
  accounts.push({
    id: new Date().toISOString(),
    title: title,
    name: name,
  });


  // Write to file system
  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json(accounts);
});
//
//CRUD:Update
app.put("/accounts/update", (req, res) => {
  //
  const { id, name, title } = req.query;
  // index-ийг нь id-гаар нь олж засах
  const index = accounts.findIndex((acc) => acc.id === id);
  accounts[index].name = name;
  accounts[index].title = title;

  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json("SUCCESS");
});
// http://localhost:4000/accounts/update?id=2024-08-17T10:22:46.286Z&name=Bold&title=harvest
//
//CRUD:Delete 200ok
app.delete("/accounts/Delete", (req, res) => {
  //
  const { id } = req.query;
  console.log({ id });
  accounts = accounts.filter((acc) => acc.id !== id);
  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json("SUCCESS");
});



// CRUD: Create, Read, Update, Delete

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})