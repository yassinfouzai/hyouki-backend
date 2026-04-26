export default function Login() {
    return (
        <div className="flex-wrapper">
            <div className="login-container">
                <form className="login-form">
                    <h2>Welcome back!</h2>
                    <div className="input-group">
                        <label for="username">Username or Email</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required/>
                    </div>
                    <div className="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </div>
    )
}