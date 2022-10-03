export interface UserOTP_JSON{
    id:string;
    role:string;
}
export   interface OTPIn{
    otp:string
    user:UserOTP_JSON
}

export   interface OTPOut{
    id:string
    user_id:string
    expires_in:number
    otp:string
    created_at:string
}



