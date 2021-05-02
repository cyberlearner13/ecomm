const layout = require('../layout');

const getError = (errors, props) => {
    try {
        return errors.mapped()[props].msg
    } catch (err) {
        return '';
    }
}

module.exports = ({
    req,
    errors
}) => {
    return layout({
        content: `
    <div>
    Your id is : ${req.session.userId}
        <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(errors, 'email')}
                <input name="password" type="password" placeholder="password" />
                ${getError(errors, 'password')}
                <input name="confirmPassword" type="password" placeholder="confirmPassword" />
                ${getError(errors, 'confirmPassword')}
                <button>Sign Up</button>
        </form>
    </div>
    `
    });
}