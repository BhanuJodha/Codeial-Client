import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import codialLogo from '../images/Codial-new.png';

const Navbar = () => {
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src={codialLogo}
            className={styles.logo}
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user &&
          <div className={styles.user}>
            <Link to="/setting">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        }

        <div className={styles.navLinks}>
          <ul>
            {auth.user ?
              <li>
                <Link onClick={auth.logOut}>Log out</Link>
              </li>
            :
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;