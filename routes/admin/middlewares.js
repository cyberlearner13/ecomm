const {
    validationResult
} = require('express-validator');

module.exports = {
    handleErrors(templateFn, dataCb) {
        // all middlewares are functions, hence a function must be returned
        return async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // call the function here to pass data to template
                let data = {};
                if (dataCb) {
                    data = await dataCb(req);
                }
                return res.send(templateFn({
                    errors,
                    ...data
                }));
            }
            next();
        }
    },
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
        }
        next();
    }
}