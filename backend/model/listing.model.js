import mongoose from 'mongoose'
import User from "./user.model.js"
const listingSchema = new mongoose.Schema({
title:{
type: String,
required: true
},

description : {
    type: String,
    required: true
},

host: {
    type: mongoose.Schema.Types.ObjectId,
    ref:User

}

})