const mongoose =require('mongoose');
const {Schema} = mongoose;

const ListsSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
   title:{
    type:String,
    required:true,
   },
   description:{
    type:String,
    required:true
   },
   date:{
    type:Date,
    default:Date.now
   }
  });

  const Lists = mongoose.model('lists',ListsSchema);
  module.exports = Lists;