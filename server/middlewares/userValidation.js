import Joi from 'joi';


const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.json({
            message: "Validation error",
            success: false,
            error: error.details[0].message
        })
    }

    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.json({
            message: "Validation error",
            success: false,
            error: error.details[0].message
        });
    }

    next();
}

export {
    registerValidation,
    loginValidation,
}