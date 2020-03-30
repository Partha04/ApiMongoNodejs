const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb+srv://auser:12345@cluster0-bzmd4.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "mydb";

var db;
MongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    else {
      db = client.db("mydb");
      console.log("connected to my db");
    }
  }
);

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  var cursor = db.collection("mycollection");
  cursor.find().toArray(function(err, results) {
    res.send(results);
  });
});

app.get("/:id", (req, res) => {
  var cursor = db.collection("mycollection");
  console.log(req.params.id);
  cursor.find({ _id: ObjectId(req.params.id) }).toArray(function(err, results) {
    res.send(results);
  });
});

app.post("/", (req, res) => {
  var cursor = db.collection("mycollection");
  console.log(req.body);
  cursor.insertOne(req.body);
  res.send("inserted");
});
app.delete("/:id", (req, res) => {
    var cursor = db.collection("mycollection");
    console.log(req.params.id);
    cursor.deleteOne({ _id: ObjectId(req.params.id) })
      res.send("deleted object sucessfully" );
});

app.put("/:id", (req, res) => {
  var cursor=db.collection('mycollection');
  cursor.updateOne(
      {_id:ObjectId(req.params.id)},
     { $set :req.body}
  )
  res.send("update sucess")
});

app.listen(port, () => {
  console.log(`Server started on port`);
});
