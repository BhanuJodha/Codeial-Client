import { Link } from 'react-router-dom';

import styles from '../../styles/home.module.css';
import { useAuth } from '../../hooks';

const FriendsList = () => {
    const auth = useAuth();
    const { friendships } = auth.user;

    return (
        <div className={styles.friendsList}>
            <div className={styles.header}>Friend List</div>

            {(friendships.length === 0
                && (
                    <div className={styles.noFriends}>NO friends found!</div>
                ))
                || (
                    friendships.map((friend) => (
                        <div key={friend._id}>
                            <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
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

export default FriendsList;