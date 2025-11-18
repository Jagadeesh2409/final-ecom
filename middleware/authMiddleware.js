const jwt = require('jsonwebtoken');
const { errorResponse,successResponse,response } = require('../utils/response');
require('dotenv').config()

const userAuth = async (req,res,next) => {
  try {
   const token =  req.headers.authorization.split(" ")[1]
   var decoded = jwt.verify(token,process.env.JWT_SECRET);
   if(!decoded) return errorResponse(res,response.UNAUTHORIZED)
   if(decoded.is_admin == true) return errorResponse(res,response.ACCESS_DENIED)
   req.user = decoded
   next()
  } catch (error) {
    errorResponse(res,response.ISE)
  }
}

const adminAuth = async (req,res) => {
    try {
   const token =  req.headers.authorization.split(" ")[1]
   var decoded = jwt.verify(token,process.env.JWT_SECRET);
   if(!decoded) return errorResponse(res,response.UNAUTHORIZED)
   if(decoded.is_admin == false) return errorResponse(res,response.ACCESS_DENIED)
   req.user = decoded
   next()
    
  } catch (error) {
    errorResponse(res,response.ISE)
  }
}

module.exports = {userAuth,adminAuth}