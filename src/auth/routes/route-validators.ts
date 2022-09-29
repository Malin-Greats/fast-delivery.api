import { body } from "express-validator"

export const routeValidate={
    auth:{
        signUp:[
            body('password').isLength({ min: 8 }).withMessage("password must have at least 8 characters."),
            body("email").isEmail().withMessage("Invalid email address."),
            body("firstname").isLength({min:3 }).withMessage("firstname is required"),
            body("lastname").isLength({min:3 }).withMessage("lastname is required"),
            body('contact').not().isEmpty().trim().escape().withMessage("contact is required"),
            body('password_confirmation').custom((value, { req }) => {
                if (value !== req.body.password) {
                throw new Error('password_confirmation does not match password');
                }
                return true;
            }),
        ],
        login:[
           
                body("contact").not().isEmpty().withMessage("Invalid contact number"),
                body("password").not().isEmpty().isLength({min:8, max: 32 }).withMessage("Password is required")

        ],
    },
    role:{
        create:[
            body("name").not().isEmpty().trim().escape().withMessage("Role name is required")
        ]
    },
    profile:{
       edit:[]
    }
}

