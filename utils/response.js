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

    USER_EXIST:"user already have an account",
    USER_REGISTERED:"user registered",
    USER_LOGIN:"user logined successfully",
    ACCOUNT_NOT_EXIST:"you haven't account please register",
    INVALID_LOGIN:"invalid email or password",

    PROFILE_GET:"profile get successfully",
    PROFILE_FAIL:"profile get failed",

    UNAUTHORIZED:"unauthorized token",
    ACCESS_DENIED:"access denied",
}

module.exports = {response,successResponse,errorResponse}