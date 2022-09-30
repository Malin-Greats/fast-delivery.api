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
    ***"model":"Nissan Navara",
    "make":"Nissan",
    "year":"2022",
    "capacity":"1000cc to 1500cc",
    "plate_number":"abc2762",
    "color":"red",
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
    "defensive_drivers_license":"defensive_drivers_license.png",
    "police_clearance":"police_clearance.pdf",
    "profile_photo":"profile_photo.jpg"
    "vehicle_technical_certificate":"vehicle_technical_certificate.pdf",
}

response:{
    "success": true,
    "data": {
        "personalID": "national_id.png",
        "drivers_license": "drivers_license.png",
        "police_clearance": "police_clearance.pdf",
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
        "police_clearance": "https://police_clearance.pdf",
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

/ride-requests/send POST
 request :{
    "customer_id": "2",
    "pick_from": {
        "address": "787 Harare",
        "description": "Description",
        "location": {
            "lat": "-17.783",
            "lng": "89.789"
        }
    },
    "drop_to": {
        "address": "787 Harare",
        "description": "Description",
        "location": {
            "lat": "-17.783",
            "lng": "89.789"
        }
    },
    "travel_time": "128978",
    "cost": 89,
    "ride_type_id": "1",
    "payment_id": "1",
    "travel_information": {
        "distance": {
            "text": "1",
            "value": "300"
        },
        "duration": {
            "text": "1",
            "value": "300"
        }
    }
}


response:
{
    "success": true,
    "data": {
        "id": 3,
        "customer_id": "2",
        "pick_from": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "drop_to": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "request_status": "pending",
        "travel_time": "128978",
        "cost": 89,
        "payment_id": "1",
        "ride_type_id": "1",
        "is_paid_for": false,
        "travel_information": {
            "distance": {
                "text": "1",
                "value": "300"
            },
            "duration": {
                "text": "1",
                "value": "300"
            }
        },
        "created_at": "2022-09-30T07:22:45.126Z"
    }
}

---------------------------------------------------------------------------------------
/ride-requests/accept PUT 
request :
{
    "request_id":"11",
    "driver_id":"1"
}

response :
"success": true,
    "data": {
        "id": 10,
        "request_id": 11,
        "customer_id": "2",
        "driver_id": "1",
        "pick_from": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "drop_to": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "accepted_at": "2022-09-30T08:15:02.839Z",
        "start_time": null,
        "end_time": null,
        "ride_cost": "89",
        "ride_status": "accepted",
        "ride_type_id": "1",
        "is_paid_for": false,
        "travel_information": {
            "distance": {
                "text": "1",
                "value": "300"
            },
            "duration": {
                "text": "1",
                "value": "300"
            }
        },
        "rating": 0
    }
}

-------------------------------------------------------------------------------------------
rides GET ALL RIDES OR FILTER RIDES BY EITHER customer_id or driver_id
GET ALL RIDES
request : /rides
FILTER
request : /rides/?customerId=2   rides/?driverId=1
response:{
    "success": true,
    "data": [
        {
            "id": 10,
            "request_id": 11,
            "customer_id": "2",
            "driver_id": 1,
            "pick_from": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "drop_to": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "accepted_at": "2022-09-30T08:15:02.839Z",
            "start_time": null,
            "end_time": null,
            "ride_cost": "89",
            "ride_status": "accepted",
            "ride_type_id": "1",
            "is_paid_for": false,
            "travel_information": {
                "distance": {
                    "text": "1",
                    "value": "300"
                },
                "duration": {
                    "text": "1",
                    "value": "300"
                }
            },
            "rating": 0
        }
    ]
}
---------------------------------------------------
start request : {ride_id:"10"} PUT
rides/start
{
    "success": true,
    "data": {
        "id": 10,
        "request_id": 11,
        "customer_id": "2",
        "driver_id": 1,
        "pick_from": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "drop_to": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "accepted_at": "2022-09-30T08:15:02.839Z",
        "start_time": "2022-09-30T08:24:21.857Z",
        "end_time": null,
        "ride_cost": "89",
        "ride_status": "stated",
        "ride_type_id": "1",
        "is_paid_for": false,
        "travel_information": {
            "distance": {
                "text": "1",
                "value": "300"
            },
            "duration": {
                "text": "1",
                "value": "300"
            }
        },
        "rating": 0,
        "request": {
            "id": 11,
            "customer_id": "2",
            "pick_from": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "drop_to": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "request_status": "accepted",
            "travel_time": "128978",
            "cost": "89",
            "payment_id": "1",
            "ride_type_id": "1",
            "is_paid_for": false,
            "travel_information": {
                "distance": {
                    "text": "1",
                    "value": "300"
                },
                "duration": {
                    "text": "1",
                    "value": "300"
                }
            },
            "created_at": "2022-09-30T08:14:55.631Z"
        }
    }
}

----------------------------------

rides/stop
request : {ride_id:"10"} PUT
response: {
    "success": true,
    "data": {
        "id": 10,
        "request_id": 11,
        "customer_id": "2",
        "driver_id": 1,
        "pick_from": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "drop_to": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "accepted_at": "2022-09-30T08:15:02.839Z",
        "start_time": "2022-09-30T08:24:21.857Z",
        "end_time": "2022-09-30T08:27:52.615Z",
        "ride_cost": "89",
        "ride_status": "stopped",
        "ride_type_id": "1",
        "is_paid_for": false,
        "travel_information": {
            "distance": {
                "text": "1",
                "value": "300"
            },
            "duration": {
                "text": "1",
                "value": "300"
            }
        },
        "rating": 0,
        "request": {
            "id": 11,
            "customer_id": "2",
            "pick_from": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "drop_to": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "request_status": "accepted",
            "travel_time": "128978",
            "cost": "89",
            "payment_id": "1",
            "ride_type_id": "1",
            "is_paid_for": false,
            "travel_information": {
                "distance": {
                    "text": "1",
                    "value": "300"
                },
                "duration": {
                    "text": "1",
                    "value": "300"
                }
            },
            "created_at": "2022-09-30T08:14:55.631Z"
        }
    }
}

/rides/cancel POST
request :{
     "ride_id":"10",
    "cancelled_by":"driver",
    "reason":"car break down"
}
response:
{
    "success": true,
    "data": {
        "cancellation_details": {
            "ride_id": "10",
            "cancelled_by": "driver",
            "cancelled_time": "2022-09-30T08:37:14.428Z",
            "penalt_fee": 0.2,
            "reason": "car break down"
        }
    }
}


//GET ride by id
request: rides/10

response :{
    "success": true,
    "data": {
        "id": 10,
        "request_id": 11,
        "customer_id": "2",
        "driver_id": 1,
        "pick_from": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "drop_to": {
            "address": "787 Harare",
            "description": "Description",
            "location": {
                "lat": "-17.783",
                "lng": "89.789"
            }
        },
        "accepted_at": "2022-09-30T08:15:02.839Z",
        "start_time": "2022-09-30T08:24:21.857Z",
        "end_time": "2022-09-30T08:27:52.615Z",
        "ride_cost": "89",
        "ride_status": "pending",
        "ride_type_id": "1",
        "is_paid_for": false,
        "travel_information": {
            "distance": {
                "text": "1",
                "value": "300"
            },
            "duration": {
                "text": "1",
                "value": "300"
            }
        },
        "rating": 0,
        "request": {
            "id": 11,
            "customer_id": "2",
            "pick_from": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "drop_to": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "request_status": "pending",
            "travel_time": "128978",
            "cost": "89",
            "payment_id": "1",
            "ride_type_id": "1",
            "is_paid_for": false,
            "travel_information": {
                "distance": {
                    "text": "1",
                    "value": "300"
                },
                "duration": {
                    "text": "1",
                    "value": "300"
                }
            },
            "created_at": "2022-09-30T08:14:55.631Z"
        }
    }
}
---------------------------------------------------------------------------
/ride-requests/all-pending
GET ALL PENDING REQUEST TO BROADCAST TO DRIVERS
{
    "success": true,
    "data": [
        {
            "id": 2,
            "customer_id": "2",
            "pick_from": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "drop_to": {
                "address": "787 Harare",
                "description": "Description",
                "location": {
                    "lat": "-17.783",
                    "lng": "89.789"
                }
            },
            "request_status": "pending",
            "travel_time": "128978",
            "cost": "89",
            "payment_id": "1",
            "ride_type_id": "1",
            "is_paid_for": false,
            "travel_information": {
                "distance": {
                    "text": "1",
                    "value": "300"
                },
                "duration": {
                    "text": "1",
                    "value": "300"
                }
            },
            "created_at": "2022-09-29T21:14:12.549Z"
        }
    ]
}

