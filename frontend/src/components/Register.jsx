export default function Register() {
    return (
    <div className="login-container">
        <form className="login-form">
            <h2>Welcome aboard!</h2>

            <div className="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Choose a username" required/>
            </div>

            <div className="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required/>
            </div>

            <div className="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Create a password" required/>
            </div>

            <div className="input-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Repeat your password"
                    required/>
            </div>

            <button type="submit" className="login-button">Register</button>

            <p className="switch-form">Already have an account? <a href="login.html">Sign In</a></p>
        </form>
    </div>
    )
}