export   interface OTPIn{
    otp:string
    user_id:string
}

export   interface OTPOut{
    id:string
    user_id:string
    expires_in:number
    otp:string
    created_at:string
}


