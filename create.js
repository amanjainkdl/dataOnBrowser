const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/inventory', {useNewUrlParser: true, useUnifiedTopology: true});
var connect = mongoose.connection;
var employeeSchema = new mongoose.Schema({
   name : String,
   email : String,
   etype : String,
   ratePerHour : Number,
   totalHourWorked : Number,
   totalSal : Number
  });
  employeeSchema.methods.totalSalary =function(){
    return this.ratePerHour * this.totalHourWorked;
  }
  var employeeModel = mongoose.model('Employee',employeeSchema);
  var employee = new employeeModel({
      name : "Aman jain",
      email : "amanjainkdl@gmail.com",
      etype : "Hourly",
      ratePerHour : 5,
      totalHourWorked : 16
  });
  employee.totalSal = employee.totalSalary();
  connect.on("connected",function(){
     console.log("Database connected");
  })
  connect.on("disconnected",function(){
    console.log("Database disconnected");
  })
  connect.on('error',console.error.bind(console,"connection error :- "));
  connect.once('open',function(){
    employee.save(function(err,res){
      if(err) throw err;
      console.log(res);
      connect.close();
    });
  })