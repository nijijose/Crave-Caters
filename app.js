const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const CaterData = require('./src/model/Caterdata');
const CustomData = require('./src/model/Customdata');

const app = new express();
app.use(cors());
app.use(bodyparser.json());

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
        foodItem : req.body.list.foodItem,
        rate : req.body.list.rate,
        imageUrl : req.body.list.imageUrl
   }  )     
   items.save();
})

app.listen(3110);