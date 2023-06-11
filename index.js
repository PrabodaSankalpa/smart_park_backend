const express = require("express");
const app = express();

app.use(express.json());

const priceChart = [
  { model: "car", price: 1 },
  { model: "van", price: 2 },
];
var vehicals = [{ vid: "KN-1234", model: "car" }];

var vehicalTime = [];

app.get("/park/:id", (req, res) => {
  const id = req.params.id;
  var vehicalModel = "";
  var vehicalPrice = 0;

  var status = 0;
  for (let i = 0; i < vehicalTime.length; i++) {
    const data = vehicalTime[i]["vid"];
    if (data == id) {
      vehicalTime[i]["endTime"] = new Date();
      const hours =
        vehicalTime[i]["endTime"].getSeconds() -
        vehicalTime[i]["startTime"].getSeconds();

      for (let i = 0; i < vehicals.length; i++) {
        if (vehicals[i]["vid"] == id) {
          vehicalModel = vehicals[i]["model"];
        }
      }

      for (let i = 0; i < priceChart.length; i++) {
        if (priceChart[i]["model"] == vehicalModel) {
          vehicalPrice = priceChart[i]["price"];
        }
      }

      const amount = hours * vehicalPrice;

      status = 1;
      console.log(amount);
      let amountString = String(amount);
      res.send(amountString);
    }
  }
  if (status == 0) {
    const addDetails = { vid: id, startTime: new Date(), endTime: 0 };
    vehicalTime.push(addDetails);
    res.send("Add start");
  }
});

app.get("/park", (req, res) => {
  res.send(vehicalTime);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listing on port : ${port}`);
});
