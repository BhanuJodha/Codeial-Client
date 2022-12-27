import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    if (logging)
      return;

    setLogging(true);
    // Notification
    const toastID = toast.loading("Logging in...");

    const response = await auth.logIn(email, password, toastID);
    // on success redirect to home page
    if (response.success)
      navigate("/");

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
      </div>
    </form>
  );
};

export default Login;
