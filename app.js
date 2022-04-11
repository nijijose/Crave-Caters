const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const CaterData = require('./src/model/Caterdata');
const CustomData = require('./src/model/Customdata');
const dbConfig = require("./app/config/db.config");


const app = new express();
app.use(cors());
app.use(bodyparser.json());

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect('mongodb+srv://userone:haihello@ictakfiles.hrt5k.mongodb.net/CraveCatering?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }


app.get('/menu',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    CaterData.find()
    .then(function(foodlist){
        res.send(foodlist);
    });
});

app.get('/custom',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    CustomData.find()
    .then(function(fooditem){
        res.send(fooditem);
    });
});

app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);

    var menu = new CaterData ({       
        foodMenu : req.body.menu.foodMenu,
        foodItem1 : req.body.menu.foodItem1,
        foodItem2: req.body.menu.foodItem2,
        rate : req.body.menu.rate,
        imageUrl : req.body.menu.imageUrl
   }  )     
  // var menu = new Fooddata(menu);
   menu.save();
});

app.post('/additem',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);

    var items = new CustomData ({       
        foodMenu : req.body.list.foodMenu,
        rate : req.body.list.rate,
        imageUrl : req.body.list.imageUrl
   }  )     
   items.save();
});

app.get('/:id',  (req, res) => {
      const id = req.params.id;
      CaterData.findOne({"_id":id})
      .then((menu)=>{
          res.send(menu);
      });
});

app.get('/:id',  (req, res) => {
    const id = req.params.id;
    CustomData.findOne({"_id":id})
    .then((menu)=>{
        res.send(menu);
    });
});

app.delete('/remove/:id',(req,res)=>{
    id = req.params.id;
    CaterData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
});

app.delete('/del/:id',(req,res)=>{
    id = req.params.id;
    CustomData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
});

app.put('/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    foodMenu= req.body.foodMenu,
    foodItem1 = req.body.foodItem1,
    foodItem2 = req.body.foodItem2,
    rate = req.body.rate,
    imageUrl = req.body.imageUrl
    CaterData.findByIdAndUpdate({"_id":id},
                                {$set:{"foodMenu":foodMenu,
                                "foodItem1":foodItem1,
                                "foodItem2":foodItem2,
                                "rate":rate,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   })
 })


 app.put('/increment',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    foodMenu= req.body.foodMenu,
    rate = req.body.rate,
    imageUrl = req.body.imageUrl
    CaterData.findByIdAndUpdate({"_id":id},
                                {$set:{"foodMenu":foodMenu,
                                "rate":rate,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   })
 })

app.listen(3110);