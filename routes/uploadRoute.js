const express = require('express')
const route = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const {v4:uuid} = require('uuid')
const upload = multer({ dest: 'uploads/temp' })
require('dotenv').config()
const db = require('../db/db')
const { errorResponse, response, successResponse } = require('../utils/response')

let users = db('users')

route.post('/',upload.single('media'),async(req,res)=>{
    const type = req.body.type;
    try {
    const finalLocation =  `${path.join(__dirname,"..","uploads")}/${type}`
    if(!fs.existsSync(finalLocation)) fs.mkdirSync(finalLocation,{recursive:true})

    const ext = path.extname(req.file.originalname)
    const fileName = `${uuid()}${ext}`
    const finalDest = `${finalLocation}/${fileName}`
    await fs.promises.rename(req.file.path,finalDest)

    const media = await db('uploads').insert({type,url:finalDest})
    
    if(type == 'profile'){
        const id = req.user.id
        const exist = await users.where({id}).first()
        if(!exist.profileId) {
         await users.update({profileId:media.id}).where({id})
        }
        await db('uploads').where({id:exist.profileId}).del()
        await users.update({profileId:media.id}).where({id})
    }


    successResponse(res,null,response.UPLOAD_SUCCESS)
    } catch (error) {
        errorResponse(res,response)
    }
})

module.exports = route