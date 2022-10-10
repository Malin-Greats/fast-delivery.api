import { body } from "express-validator"

export const CustomerRouteValidators={
    auth:{
        signUp:[
            body('password').isLength({ min: 8 }).withMessage("password must have at least 8 characters."),
            body("email").isEmail().withMessage("Invalid email address."),
            body("firstname").isLength({min:3 }).withMessage("firstname is required"),
            body("lastname").isLength({min:3 }).withMessage("lastname is required"),
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
    role:{
        create:[
            body("name").notEmpty().trim().escape().withMessage("Role name is required")
        ]
    },
    profile:{
        change_password:[
            body("old_password").isLength({ min: 8 }).withMessage("password must have at least 8 characters."),
            body('new_password').isLength({ min: 8 }).withMessage("password must have at least 8 characters."),
            body('new_password_confirmation').custom((value, { req }) => {
                if (value !== req.body.new_password) {
                throw new Error('new_password_confirmation does not match new_password');
                }
                return true;
            }),
        ],
       edit:[
       ],
    //    change_profile_photo:[
    //         body("profile_photo").notEmpty().withMessage("profile_photo is required"),
    //    ]
    }
}

