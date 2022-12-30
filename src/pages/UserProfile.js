import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "../api";
import { Loader } from "../components";
import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [friendApi, setFriendApi] = useState(false);

    const navigate = useNavigate();
    const { userId } = useParams();
    const auth = useAuth();

    // Check if the user is not same as login user
    if (userId === auth.user._id) {
        navigate("/setting", { replace: true });
    }

    const checkFriendship = () => {
        return auth.user.friendships.find((e) => e.to_user._id === userId);
    };

    useEffect(() => {
        const getUser = async () => {
            const response = await fetchUser(userId);
            if (response.success) {
                setUser(response.data.user);
                setLoading(false);
            }
            else {
                navigate("/", { replace: true });
            }
        };
        getUser();
    }, [navigate, userId]);

    // Add a friend
    const addFriend = async () => {
        const toastID = toast.loading("Adding friend...");
        setFriendApi(true);
        await auth.createFriendship(userId, toastID);
        setFriendApi(false);
    }

    // Remove a friend
    const removeFriendship = async () => {
        const toastID = toast.loading("Removing friend...");
        setFriendApi(true);
        await auth.removeFriend(userId, toastID);
        setFriendApi(false);
    }


    if (loading) {
        return <Loader />;
    }

    return (
        <div className={styles.settings}>
            <Link to="/" className={styles.goBack}>Home</Link>
            <div className={styles.imgContainer}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                    alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>{user.name}</div>
            </div>

            {checkFriendship() ?
                <div className={styles.btnGrp}>
                    <button className={`button ${styles.saveBtn}`} onClick={removeFriendship} disabled={friendApi}>{friendApi ? "Removing..." : "Remove Friend"}</button>
                </div>
                :
                <div className={styles.btnGrp}>
                    <button className={`button ${styles.saveBtn}`} onClick={addFriend} disabled={friendApi}>{friendApi ? "Adding..." : "Add Friend"}</button>
                </div>
            }
        </div>
    );
}

export default UserProfile;