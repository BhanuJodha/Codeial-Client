import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "../api";
import { Loader } from "../components";
import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";
import { API_ORIGIN } from "../utils";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [friendApi, setFriendApi] = useState(false);

    const navigate = useNavigate();
    const { userId } = useParams();
    const auth = useAuth();

    const checkFollowing = () => {
        return auth.user.following.find((e) => e.to_user._id === userId);
    };

    useEffect(() => {
        const getUser = async () => {            
            // Check if the user is not same as login user
            if (userId === auth.user._id) {
                navigate("/setting", { replace: true });
            }
            else {
                const response = await fetchUser(userId);
                if (response.success) {
                    setUser(response.data.user);
                    setLoading(false);
                }
                else {
                    navigate("/", { replace: true });
                }
            }
        };
        getUser();
    }, [navigate, userId, auth]);

    // Add a friend
    const addFollowing = async () => {
        const toastID = toast.loading("Following...");
        setFriendApi(true);
        await auth.createFollowing(userId, toastID);
        setFriendApi(false);
    }

    // Remove a friend
    const removeFollowing = async () => {
        const toastID = toast.loading("Unfollowing...");
        setFriendApi(true);
        await auth.removeFollowing(userId, toastID);
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
                    src={API_ORIGIN + user.avatar}
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

            {checkFollowing() ?
                <div className={styles.btnGrp}>
                    <button className={`button ${styles.saveBtn}`} onClick={removeFollowing} disabled={friendApi}>{friendApi ? "Removing..." : "Unfollow"}</button>
                </div>
                :
                <div className={styles.btnGrp}>
                    <button className={`button ${styles.saveBtn}`} onClick={addFollowing} disabled={friendApi}>{friendApi ? "Adding..." : "Follow"}</button>
                </div>
            }
        </div>
    );
}

export default UserProfile;