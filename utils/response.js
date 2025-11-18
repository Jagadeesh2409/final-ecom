const successResponse = (res,data,message = "success",status =200) =>{
    return res.status(status).json({message,data})
}

const errorResponse = (res,message = 'failed',status = 400) => {
    return res.status(status).json({message})
}

const response = {
    ISE:"internal server error"
}

module.exports = {response,successResponse,errorResponse}