import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";

import styles from "../styles/login.module.css";
import { API_ROOT } from "../utils";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signingUp, setSigningUp] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!signingUp) {
            setSigningUp(true);

            // Showing notification
            const toastID = toast.loading("Signing Up...");
            const response = await auth.signUp(name, email, password, confirmPassword, toastID);

            // Redirecting the user to login page
            if (response.success)
                navigate("/login", { state: { email } });

            setSigningUp(false);
        }
    }

    const googleSignIn = (e) => {
        e.preventDefault();
        window.open(API_ROOT + "/users/oauth/google", "_self")
    }

    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <span className={styles.loginSignupHeader}> Sign Up</span>
            <div className={styles.field}>
                <input
                    disabled={signingUp}
                    placeholder="Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    disabled={signingUp}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    disabled={signingUp}
                    placeholder="Confirm password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    disabled={signingUp}
                    placeholder="Password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <button disabled={signingUp}>
                    {signingUp ? 'Signing up...' : 'Sign Up'}
                </button>
                <div className={styles.divider}>
                    <span>OR</span>
                </div>
                <button className={styles.google} disabled={signingUp} formNoValidate onClick={googleSignIn}><img src='https://cdn-icons-png.flaticon.com/512/300/300221.png' alt='google'></img> Sign In with Google</button>
            </div>
        </form>
    );
}

export default Signup;