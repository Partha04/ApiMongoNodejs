const express = require('express');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

const app=express();

const mongoschema=mongoose.Schema(
    {
        studio:String,
        genres:Array,
        hype:Number,
        description:String,
        title:{
            link:String,
            text:String
        },
        start_date:Date
    }
)

mongoose.model('user',mongoschema);