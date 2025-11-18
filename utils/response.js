const successResponse = (res,data,message = "success",status =200) =>{
    return res.status(status).json({success:"ok",message,data})
}

const errorResponse = (res,message = 'failed',status = 400) => {
    return res.status(status).json({success:"fail",message})
}

const response = {
    ISE:"internal server error",

    UPLOAD_SUCCESS:"upload success",
    UPLOAD_FAILED:"upload failed",
}

module.exports = {response,successResponse,errorResponse}