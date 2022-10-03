import { body } from "express-validator";

 export const ShareRouteValidator = {
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
       change_profile_photo:[
            body("profile_photo").notEmpty().withMessage("profile_photo is required"),
       ]
    }
}