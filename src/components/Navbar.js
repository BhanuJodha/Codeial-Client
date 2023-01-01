import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';

import styles from '../styles/navbar.module.css';
import codialLogo from '../assets/images/Codial-new.png';
import { searchUser } from '../api';
import { API_ORIGIN } from '../utils';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      if (searchText.length > 2) {
        const response = await searchUser(searchText);
        if (response.success) {
          setResults(response.data.users);
        }
      }
      else
        setResults([]);
    })()
  }, [searchText]);

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

      {auth.user &&
        <div className={styles.searchContainer}>
          <img
            className={styles.searchIcon}
            src="https://cdn-icons-png.flaticon.com/512/2652/2652234.png"
            alt="Search icon"
          />

          <input
            placeholder="Search users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {results.length > 0 && (
            <div className={styles.searchResults} onClick={() => { setResults([]) }}>
              <ul>
                {results.map((user) => (
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <Link to={`/user/${user._id}`}>
                      <img
                        src={API_ORIGIN + user.avatar}
                        alt=""
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }

      <div className={styles.rightNav}>
        {auth.user &&
          <div className={styles.user}>
            <Link to="/setting">
              <img
                src={API_ORIGIN + auth.user.avatar}
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