API DEFINATIONS
login User /auth/login  POST
request:
{
 "email":"leo@driver.com", "password":"pass@driver"
}
response:
{
    "success": true,
    "data": {
        "user": {
            "id": 4,
            "firstname": "leo",
            "lastname": "vare",
            "email": "leo@driver.com",
            "contact": "017222337",
            "profile_photo": "http://profile.png",
            "is_active": true,
            "is_verified": false,
            "created_at": "2022-09-23T10:20:36.328Z",
            "updated_at": "2022-09-24T16:28:08.339Z",
            "role": "driver"
        },
        "token": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE2NjQxODg0NzYsImV4cCI6MTY2NDE5MjA3Nn0.ETX4e2diRqNqALUS7N-203F7GkaWnKiwzT7mQL334uI",
            "expiresIn": 3600
        }
    }
}
Get User Profile /profile GET
request:  /profile
response: {
    "success": true,
    "data": {
        "email": "leo@driver.com",
        "firstname": "leo",
        "lastname": "vare",
        "contact": "017222337",
        "profile_photo": "http://profile.png",
        "role": "driver"
    }
}


Update User Profile /profile/edit  UPDATE
 request:{
        "email": "leo@driver.com",
        "firstname": "leo",
        "lastname": "vare",
        "contact": "017222337",
        "profile_photo": "http://profile.png"
}
response:{
    "success": true,
    "data": {
        "email": "leo@driver.com",
        "firstname": "leo",
        "lastname": "vare",
        "contact": "017222337",
        "profile_photo": "http://profile.png",
        "role": "driver"
    }
}



Get All Drivers /drivers  GET
request /drivers
response:{
    "success": true,
    "data": [
        {
            "id": 1,
            "profile": {
                "firstname": "leo",
                "lastname": "vare",
                "email": "leo@driver.com",
                "contact": "017222337",
                "role": "driver"
            },
            "driving_info": {
                "ride_status": "no_ride",
                "approval_status": "approved",
                "overall_rating": 0
            }
        }
    ]
}

Get Driver By Id /driver/:driverId GET
request: drivers/1
response:
{
    "success": true,
    "data": {
        "id": 1,
        "profile": {
            "firstname": "leo",
            "lastname": "vare",
            "email": "leo@driver.com",
            "contact": "017222337",
            "role": "driver"
        },
        "driving_info": {
            "ride_status": "no_ride",
            "approval_status": "approved",
            "overall_rating": 0
        }
    }
}


Add Driver Veichles ---> driver/:driverId/vehicles POST
request:
{
    "model":"Nissan Navara",
    "make":"Nissan",
    "year":"2022",
    "capacity":"1000cc to 1500cc",
    "plate_number":"abc2762",
    "color":"red",
    "vehicle_technical_certificate":"vehicle_technical_certificate.pdf",
    "vehicle_insurance_registration":"vehicle_insurance_registration.pdf"
}
response:
{
    "success": true,
    "data": {
        "id": 6,
        "make": "Nissan",
        "model": "Nissan Navara",
        "year": "2022",
        "capacity": "1000cc to 1500cc",
        "plate_number": "akc2762",
        "color": "red",
        "vehicle_insurance_registration": "vehicle_insurance_registration.pdf",
        "vehicle_technical_certificate": "vehicle_technical_certificate.pdf",
        "created_at": "2022-09-26T10:47:11.074Z",
        "updated_at": "2022-09-26T10:47:11.074Z"
    }
}

Find Driver Vehicles ---> driver/:driverId/vehicles  GET

request:  driver/1/vehicles
response:
{
    "success": true,
    "data": [
        {
            "id": 1,
            "make": "toyota",
            "model": "fortuner GD6",
            "year": "2022",
            "capacity": "1000cc to 1500cc",
            "plate_number": "abc2762",
            "color": "red",
            "vehicle_insurance_registration": "http://vehicle_insurance_registration.pdf",
            "vehicle_technical_certificate": "http://vehicle_technical_certificate.pdf",
            "created_at": "2022-09-23T11:26:17.688Z",
            "updated_at": "2022-09-23T11:26:17.688Z"
        },
        {
            "id": 4,
            "make": "toyota",
            "model": "hillux D4D",
            "year": "2022",
            "capacity": "1000cc to 1500cc",
            "plate_number": "abf2762",
            "color": "red",
            "vehicle_insurance_registration": "http://vehicle_insurance_registration.pdf",
            "vehicle_technical_certificate": "http://vehicle_technical_certificate.pdf",
            "created_at": "2022-09-23T11:28:15.809Z",
            "updated_at": "2022-09-23T11:28:15.809Z"
        }
    ]
}


Add Driver Documents  /driver/:driverId/documents
request: 
{
    "personal_id":"national_id.png",
    "drivers_license":"drivers_license.png",
    "background_check":"background_check.pdf",
    "profile_photo":"profile_photo.jpg"
}

response:{
    "success": true,
    "data": {
        "personalID": "national_id.png",
        "drivers_license": "drivers_license.png",
        "background_check": "background_check.pdf",
        "profile_photo": "profile_photo.jpg"
    }
}
Get Driver Documtents /driver/:driverId/documents
request /driver/:driverId/documents
response: {
    "success": true,
    "data": {
        "personalID": "https://national_id.png",
        "drivers_license": "https://drivers_license.png",
        "background_check": "https://background_check.pdf",
        "profile_photo": "profile_photo.jpg"
    }
}

//user/userId GET

request: /user/1  GET
esponse:
{
    "success": true,
    "data": {
        "id": 1,
        "firstname": "fuser",
        "lastname": "luser",
        "email": "user@customer.com",
        "contact": "777547547",
        "profile_photo": null,
        "is_active": true,
        "is_verified": false,
        "created_at": "2022-09-22T18:31:22.617Z",
        "updated_at": "2022-09-22T18:31:22.617Z",
        "role": "customer"
    }
}

/users GET
//response
{
    "success": true,
    "data": [
        {
            "id": 1,
            "firstname": "fuser",
            "lastname": "luser",
            "email": "user@customer.com",
            "contact": "777547547",
            "profile_photo": null,
            "is_active": true,
            "is_verified": false,
            "created_at": "2022-09-22T18:31:22.617Z",
            "updated_at": "2022-09-22T18:31:22.617Z",
            "role": "customer"
        },
        {
            "id": 3,
            "firstname": "fsam",
            "lastname": "lsam",
            "email": "sam@driver.com",
            "contact": "713222556",
            "profile_photo": null,
            "is_active": true,
            "is_verified": false,
            "created_at": "2022-09-22T18:33:49.500Z",
            "updated_at": "2022-09-22T18:33:49.500Z",
            "role": "driver"
        },
        {
            "id": 12,
            "firstname": "praise",
            "lastname": "matsiwe",
            "email": "praise@driver.com",
            "contact": "0783672368",
            "profile_photo": null,
            "is_active": true,
            "is_verified": false,
            "created_at": "2022-09-24T12:47:03.330Z",
            "updated_at": "2022-09-24T12:47:03.330Z",
            "role": "customer"
        },
        {
            "id": 4,
            "firstname": "leo",
            "lastname": "vare",
            "email": "leo@driver.com",
            "contact": "017222337",
            "profile_photo": "http://profile.png",
            "is_active": true,
            "is_verified": false,
            "created_at": "2022-09-23T10:20:36.328Z",
            "updated_at": "2022-09-24T16:28:08.339Z",
            "role": "driver"
        }
    ]
}


{
    errors: {

    }
    success:false
}
