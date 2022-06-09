
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/reportsDB');

const reportSchema = new mongoose.Schema({
 reportID: String,
 reportDetails: {
   userID: String,
   marketID: String,
   marketName: String,
   cmdtyID: String,
   marketType: String,
   cmdtyName: String,
   priceUnit: String,
   convFctr: Number,
   price: Number
 }
});
const Report = mongoose.model("Report",reportSchema);



app.post("/reports", function(req,res){

var reportId ="";

 Report.find({'reportDetails.marketID': req.body.marketID , 'reportDetails.cmdtyID': req.body.cmdtyID},function(err,foundReports){
  if(!err){
    if(foundReports.length >= 1){
      reportId = foundReports[0].reportID;
    }
    else{
      reportId = uuidv4();
    }
  }
  else{
    console.log(err);
  }

  const newReport = new Report({
    reportID: reportId,
    reportDetails:{
      userID: req.body.userID,
      marketID: req.body.marketID,
      marketName: req.body.marketName,
      cmdtyID: req.body.cmdtyID,
      marketType: req.body.marketType,
      cmdtyName: req.body.cmdtyName,
      priceUnit: req.body.priceUnit,
      convFctr: req.body.convFctr,
      price: req.body.price
    }
  });



    newReport.save(function(err){
    if(!err){
      const response = {
        status: "success",
        reportID: newReport.reportID
      };
      res.send(response);
    }
    else{
      res.send(err);
    }
  });

});


});

app.get("/reports",function(req,res){
  const requestedReportID = req.query.reportID;
  Report.find({reportID: requestedReportID}, function(err,foundReports){
    if(!err){
      var users = [];
      var priceSum = 0 ;
      foundReports.forEach(function(foundReport){
        users.push(foundReport.reportDetails.userID);
        priceSum = priceSum + (foundReport.reportDetails.price/foundReport.reportDetails.convFctr);
      });

      const aggPrice = priceSum/foundReports.length;

      aggregateReport = {
        id: requestedReportID,
        cmdtyName: foundReports[0].reportDetails.cmdtyName,
        cmdtyID: foundReports[0].reportDetails.cmdtyID,
        marketID: foundReports[0].reportDetails.marketID,
        marketName: foundReports[0].reportDetails.marketName,
        users: users,
        timestamp: Date.now(),
        priceUnit: "Kg",
        price: aggPrice
      }

      res.send(aggregateReport);


    }
    else{
      res.send(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
