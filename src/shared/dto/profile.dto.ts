export interface RideMemberProfile{
    email?:string
    firstname: string;
    lastname: string;
    phone_number?:String
    rating?:number
    profile_photo?:string
}

export interface UserProfile{
    firstname    :string
    lastname    :string
    email       :string 
    phone_number     :string
    profile_photo?:string
    rating?:number
}