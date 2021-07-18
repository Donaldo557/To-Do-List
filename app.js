const express = require("express");

const bodyParser = require("body-parser");

const app = express()

const date = require(__dirname + "/date.js")

const items = ["Code","Eat","Sleep"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static("public"))

app.get("/", function(req, res) {

const day = date.getDate();

  res.render('list', {
    listTitle: day,
    listitems: items
  })
})


app.post("/", function(req, res) {
  const item = req.body.newitem

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/")
  }

})


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work list",
    listitems: workItems
  })
})





app.listen(4000, function() {
  console.log("Your server is running on port ");
})
