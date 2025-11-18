const db = require("../db/db");
const {
    errorResponse,
    successResponse,
    response,
} = require("../utils/response");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {client} = require('../config/googleConfig')



const register = async (req, res) => {
  const data = req.body;

  try {
    const exist = await db("users").where({ email: data.email }).first();
    if (exist) {
      return errorResponse(res, response.USER_EXIST);
    }
    const hash = await argon2.hash(data.password);
    data.password = hash;

    const user = await db("users").insert(data);

    const token = jwt.sign(
      { id: user.id, status: user.status, is_admin: user.is_admin },
      process.env.JWT_SECRET
    );

    successResponse(res, { token }, response.USER_REGISTERED);
  } catch (error) {
    errorResponse(res, response.ISE);
  }
};



const login = async (req, res) => {
  const data = req.body;
  try {
    const exist = await db("users").where({ email: data.email }).first();
    if (!exist) {
      return errorResponse(res, response.ACCOUNT_NOT_EXIST);
    }

    const verify = await argon2.verify(exist.password, data.password);

    if (!verify) return errorResponse(res, response.INVALID_LOGIN);

    const token = jwt.sign(
      { id: exist.id, status: exist.status, is_admin: exist.is_admin },
      process.env.JWT_SECRET
    );

    successResponse(res, { token }, response.USER_LOGIN);
  } catch (error) {
    errorResponse(res, response.ISE);
  }
};




const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await db("users").where({ id }).first();
    successResponse(
      res,
      { name: user.username, phoneNumber: user.phoneNumber, email: user.email },
      response.PROFILE_GET
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, response.ISE);
  }
};


const googleAuth = async (req,res) => {

    const url = client.generateAuthUrl({
        access_type:"offline",
        scope:["profile","email"],
    })
    res.send(`<a href = ${url}>google</a>`)
}




const googleredirect = async(req,res) => {
    const code = req.query.code
    try {
    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload()
    
    const data = {
          username: payload.name,
          email:payload.email,
          login_provider:"google",
          google_id:payload.iat,
          email_verified:payload.email_verified,
    }

    let exist = await db('users').where({email:payload.email}).first()
    if(!exist){
        const [id] = await db('users').insert(data)
        exist = await db('users').where({id}).first()
    } 
      const token = jwt.sign(
      { id: exist.id, status: exist.status, is_admin: exist.is_admin },
      process.env.JWT_SECRET
    );
    successResponse(res,{token},response.USER_LOGIN)
    } catch (error) {
        errorResponse(res,response.ISE)  
    }
}


module.exports = { register, login, getProfile, googleAuth,googleredirect };
