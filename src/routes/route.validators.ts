import { body } from "express-validator"
export const validators={  auth:{signUpValidator:[
    body('password').isLength({ min: 8 }).withMessage("password must have at least 8 characters."),body("email").isEmail().withMessage("Invalid email address."),
    body("username").not().isEmpty().isLength({min:3 }).withMessage("username is required"),body("roleId").not().isEmpty().withMessage("roleId is required"),
    body('contact').not().isEmpty().trim().escape().withMessage("contact is required"),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error('password_confirmation does not match password');
        }
        return true;
    }),
],
 loginValidator:[body("email").isEmail().withMessage("Invalid email address"),body("password").not().isEmpty().isLength({min:8, max: 32 }).withMessage("Password is required")]

},
 role:{
    postValidator:body("name").not().isEmpty().trim().escape().withMessage("Role name is required")
},

 user:{ postValidator:[body("username").not().isEmpty().trim().escape().withMessage("Username is required"), body('email').isEmail().withMessage("Invalid email address"),
body('password').isLength({ min: 8, max:32 }).withMessage("Password must have at least 8 characters"), body("roleId").not().isEmpty().withMessage("roleId is required")]
}}