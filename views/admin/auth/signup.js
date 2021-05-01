module.exports = ({
    req
}) => {
    return `
    <div>
    Your id is : ${req.session.userId}
        <form method="POST">
                <input name="email" type="email" placeholder="email" />
                <input name="password" type="password" placeholder="password" />
                <input name="confirmPassword" type="password" placeholder="confirmPassword" />
                <button>Sign Up</button>
        </form>
    </div>
    `
}