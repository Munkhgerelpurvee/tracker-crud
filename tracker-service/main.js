const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
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

/*
* HTTP request methods                    path name: 
* CREATE: POST                            / categories
* READ: GET                               /categories /      ONE Category - /categories:id
* UPDATE: PUT/ PATCH                      /categories:id
* DELETE: DELETE                          /categories:id

*/
//  энэ функцийг бичих
function getAccounts() {}

//  энэ функцийг бичих
function getOneAccount(id) {}

//  энэ функцийг бичих
function updateAccounts(id, update) {}

//  энэ функцийг бичих
function deleteAccounts(id) {}

//
async function createNewAccount(newAccount) {
  // id-ийг огноогоор үүсгэх нь сул талтай. id- нь хүн тааж олох боломжгүй мөн хэзээ ч давхарддаггүй байх ёстой байдаг. Энэ id-ийг  үүсгэж өгдөг сангууд байдаг. Ж нь : uuid - universal uniqui ID
  const id = uuidv4();
  newAccount.id = id;
  //
  //

  // console.log("=== Where isBACKEND req.body ===", req.body);
  accounts.push(newAccount);
  // Write to file system
  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  return id;
}

// CRUD:Read
app.get("/accounts", (req, res) => {
  res.json(accounts);
});

// CRUD:Read ONE category-g
app.get("/accounts/:id", (req, res) => {
  const { id } = req.params;
  const account = accounts.find(acc.id === id);
  res.json(account);
});

//
//CRUD:Create
// body-гоос name, title  оруулах юм байна. Түүнийгээ createNewAccount функц рүү дамжуулаад энэ функц маань id гэдэг юм дамжуулна түүнийг нь res.status(201).json({ id }); --д хийгээд дамжуулчихна гэдэг харахад цэгцтэй болж байна. Харин createNewAccount функц нь зөвхөн цоо шинэ account үүсгэдэг болж байна. app.post("/accounts", async (req, res) хараин энд бол createNewAccount функц--ээс юм аваад дамжуулдаг үйлдэл хийгдэж байна. Ингээд тус тусад нь хийх юм бол дараа нь  createNewAccount --ийг цааш дата баазтай холбоё гэвэл app.post("/accounts", async (req, res) => энэ код огт өөрчлөгдөхгүй давуу талтай. Ганцхан createNewAccount функц доторх код өөрчлөгдөнө. Нэг функц нэг үйлдлээ л сайн хийдэг баймаар байгаад байна. app.post("/accounts", async (req, res) =>  энэ функц бол дамжуулалтын үүрэг гүйцэтгээд байна.createNewAccount функц нь цаашаагаа дата бааз руу хадгалдаг үйлдлийг хийнэ.

app.post("/accounts", async (req, res) => {
  //   console.log(req.params);
  //   console.log(req.query);
  //   accounts.push({ title: "new accounts", name: "saraa" });
  //   res.json("SUCCESS");
  const { name, title } = req.body;
  id = await createNewAccount({ name, title });
  res.status(201).json({ id });
});

// Хэрэглэгчээс буюу FrontEnd-c юм дамжуулахад 2 төрлөөр дамжуулж өгч байгаа. Нэг нь бол шууд зам дээр нь ID өгнө (catergory/1234). Ингэж зам дээр нь  ID өгсөнийг // const { id, name, title } = req.params; гэж барьж авна. Нөгөө арга нь (/catergory?id=1234) req.query буюу const { id, name, title } = req.query; гэж утгыг нь барьж авна.

//CRUD:Update
app.put("/accounts/:id", (req, res) => {
  //parameter-ээр орж ирж байгаа зүйлийг  const { id, name, title } = req.query req.query -гэж барьж авдаг байгаа.
  const { id } = req.params;
  const { name, title } = req.body;
  // index-ийг нь id-гаар нь олж засах
  const index = accounts.findIndex((acc) => acc.id === id);
  accounts[index].name = name;
  accounts[index].title = title;

  //  Bad reqest - хүсэлт буруу байна.
  if (!name && !title) {
    res.status(400).json({ message: "`Name & Title is required`" });
    return;
  }

  fs.writeFileSync("accounts.json", JSON.stringify(accounts));
  res.json("SUCCESS");
});
// http://localhost:4000/accounts/update?id=2024-08-17T10:22:46.286Z&name=Bold&title=harvest

//
//CRUD:Delete 200ok
app.delete("/accounts/:id", (req, res) => {
  //
  const { id } = req.params;
  console.log({ id });
  // тухайн утгах id-тай data бхгүй бол яах вэ? гэвэл бхгүй байна гэдэг алдаа заах ёстой.
  const deleteIndex = accounts.findIndex((acc) => acc.id === id);
  // хэрвээ deleteIndex нь бхгүй буюу тэгээс бага байх юм бол:
  if (deleteIndex < 0) {
    res.sendStatus(404);
    return;
  }

  accounts = accounts.filter((acc) => acc.id !== id);
  fs.writeFileSync("accounts.json", JSON.stringify(accounts));

  res.sendStatus(204);
});

// CRUD: Create, Read, Update, Delete

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
