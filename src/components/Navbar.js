import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user &&
          <div className={styles.user}>
            <a href="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                alt=""
                className={styles.userDp}
              />
            </a>
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
                  <Link>Register</Link>
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