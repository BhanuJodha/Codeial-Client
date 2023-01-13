import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Login = () => {
  // fetching signup email
  const location = useLocation();

  const [email, setEmail] = useState(location.state ? location.state.email : "");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);

  const auth = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    if (logging)
      return;

    setLogging(true);
    // Notification
    const toastID = toast.loading("Logging in...");
    await auth.logIn(email, password, toastID);

    setLogging(false);
  }

  return (
    <form className={styles.loginForm} onSubmit={formHandler}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Paasword" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
      </div>


      <div className={styles.field}>
        <button disabled={logging}>{logging ? "Logging In..." : "Log In"}</button>
        <div className={styles.divider}>
          <span>OR</span>
        </div>
        <button className={styles.google} disabled={logging}><img src='https://cdn-icons-png.flaticon.com/512/300/300221.png' alt='google'></img> Sign In with Google</button>
      </div>
    </form>
  );
};

export default Login;
