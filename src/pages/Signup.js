import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";

import styles from "../styles/login.module.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signingUp, setSigningUp] = useState(false);

    const auth = useAuth();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!signingUp) {
            setSigningUp(true);
    
            // Showing notification
            const toastID = toast.loading("Signing Up...");
            await auth.signUp(name, email, password, confirmPassword, toastID);
    
            setSigningUp(false);
        }
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
            </div>
        </form>
    );
}

export default Signup;