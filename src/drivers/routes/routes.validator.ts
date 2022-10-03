import { body } from "express-validator"

export const driverRouteValidator={
    driver:{
        signUp:[
            body('password').isLength({ min: 8 }).withMessage("password must have at least 8 characters."),
            body("email").isEmail().withMessage("Invalid email address."),
            body("firstname").isLength({min:3 }).withMessage("firstname is required"),
            body("lastname").isLength({min:3 }).withMessage("lastname is required"),
            body("national_id").isLength({min:3 }).withMessage("national_id is required"),
            body('phone_number').not().isEmpty().trim().escape().withMessage("phone_number is required"),
            body('password_confirmation').custom((value, { req }) => {
                if (value !== req.body.password) {
                throw new Error('password_confirmation does not match password');
                }
                return true;
            }),
        ],
        login:[
            body("phone_number").notEmpty().withMessage("phone_number  is required"),
            body("password").notEmpty().isLength({min:8, max: 32 }).withMessage("Password is required")
    ],
    },
    vehicle:{
        create:[
            body("make").not().isEmpty().withMessage("make is required"),
            body("year").not().isEmpty().withMessage("year is required"),
            body("color").not().isEmpty().withMessage("color is required"),
            body("model").not().isEmpty().withMessage("model is required"),
        ]
    },
    documents:{
        create:[
            body("national_id").not().isEmpty().withMessage("national_id is required"),
            body("drivers_license").not().isEmpty().withMessage("drivers_license is required"),
            body("police_clearance").not().isEmpty().withMessage("police_clearance is required"),
            body("defensive_drivers_license").not().isEmpty().withMessage("defensive_drivers_license is required"),
            body("vehicle_technical_certificate").not().isEmpty().withMessage("vehicle_technical_certificate is required"),
            body("vehicle_insurance_registration").not().isEmpty().withMessage("vehicle_insurance_registration is required"),
        ]
    }
}

