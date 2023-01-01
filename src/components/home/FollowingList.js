import { Link } from 'react-router-dom';

import styles from '../../styles/home.module.css';
import { useAuth } from '../../hooks';
import { API_ORIGIN } from '../../utils';

const FollowingList = () => {
    const auth = useAuth();
    const { following } = auth.user;

    return (
        <div className={styles.friendsList}>
            <div className={styles.header}>Following List</div>

            {(following.length === 0
                && (
                    <div className={styles.noFriends}>NO following found!</div>
                ))
                || (
                    following.map((friend) => (
                        <div key={friend._id}>
                            <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                                <img
                                    src={API_ORIGIN + friend.to_user.avatar}
                                    alt="user-pic"
                                />
                                <div className={styles.friendsName}>{friend.to_user.name}</div>
                            </Link>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default FollowingList;