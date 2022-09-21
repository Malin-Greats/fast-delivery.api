export   interface OtpIn{
    otp:string
    userId:string
}

export   interface OtpOut{
    ID:string
    userId:string
    expiresIn:number
    isExpired:boolean
    otp:string
    createAt:string
}


