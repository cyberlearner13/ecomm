const {
    validationResult
} = require('express-validator');

module.exports = {
    handleErrors(templateFn) {
        // all middlewares are functions, hence a function must be returned
        return (req, res, next) => {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.send(templateFn({
                    errors
                }));
            }
            next();
        }
    }
}