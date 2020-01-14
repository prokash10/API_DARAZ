const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
    Description:{
        type:String,
        required:true,
        min:3,
        trim:true
    },
    Price:{
        type: Number,
        required: true,
        minlength:1,
        trim: true
    },
    Image:{
        type:String
    }
});

module.exports = mongoose.model('Product',ProductSchema);
