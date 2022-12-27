import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const Setting = () => {
    const [editMode, setEditMode] = useState(false);

    const auth = useAuth();

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
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            {!editMode ?
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Name</div>
                        <div className={styles.fieldValue}>{auth.user?.name}</div>
                    </div>

                    <div className={styles.btnGrp}>
                        <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                </>

                :

                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Name</div>
                        <input type={"text"} value={auth.user?.name} />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input type="password" />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input type="password" />
                    </div>

                    <div className={styles.btnGrp}>
                        <button className={`button ${styles.saveBtn}`}>Save Changes</button>
                        <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>Go Back</button>
                    </div>
                </>
            }
        </div>
    );
}

export default Setting;