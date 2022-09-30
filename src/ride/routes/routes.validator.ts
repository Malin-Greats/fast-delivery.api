import { body } from "express-validator"

export const ridesRouteValidator={
    rideTypes:{
        create:[
            body('vehicle_image').not().isEmpty().withMessage("vehicle_image is required."),
            body("max_passengers").not().isEmpty().withMessage("max_passengers eis required."),
            body("multiplier").not().isEmpty().withMessage("multiplier is required"),
            body("title").not().isEmpty().withMessage("title is required"),
        ],
        put:[]
    },
    rides:{
        cancel:[
            body("ride_id").not().isEmpty().withMessage("ride_id is required"),
            body("cancelled_by").not().isEmpty().withMessage("cancelled_by is required"),
            body("reason").not().isEmpty().withMessage("reason is required"),
        ]
    },
    rideRequest:{
        send:[
            body("customer_id").not().isEmpty().withMessage("customer_id is required"),
            body("pick_from").notEmpty().withMessage("pick_from is required"),
            body("drop_to").notEmpty().withMessage("drop_to is required"),
            body("travel_time").notEmpty().withMessage("travel_time is required"),
            body("cost").not().isEmpty().withMessage("cost is required"),
            body("ride_type_id").not().isEmpty().withMessage("ride_type_id is required"),
            body("payment_id").not().isEmpty().withMessage("payment_id is required"),
            body("travel_information").notEmpty().withMessage("travel_information is required")
        ],
        accept:[
            body("request_id").not().isEmpty().withMessage("request_id is required"),
            body("driver_id").not().isEmpty().withMessage("driver_id is required"),
        ]
    }
}

