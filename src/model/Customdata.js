const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:haihello@ictakfiles.hrt5k.mongodb.net/CraveCatering?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewCustomSchema = new Schema({
    foodItem : String,
    rate : Number,
    imageUrl : String
});

var Customdata = mongoose.model('custom', NewCustomSchema);                        
module.exports = Customdata;