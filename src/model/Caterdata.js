const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:haihello@ictakfiles.hrt5k.mongodb.net/CraveCatering?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewCaterSchema = new Schema({
    foodMenu : String,
    foodItem1 : String,
    foodItem2: String,
    rate : Number,
    imageUrl : String,
    visible: { type : Boolean ,
        default: false}
});

var Caterdata = mongoose.model('food', NewCaterSchema);                        
module.exports = Caterdata;