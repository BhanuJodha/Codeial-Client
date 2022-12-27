import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const Setting = () => {
    const auth = useAuth();
    
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user ? auth.user.name :"");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);

    const saveChanges = async () => {
        if (!saving) {
            setSaving(true);
            const toastID = toast.loading("Saving...");
            
            const response = await auth.editUser(name, password, confirmPassword, toastID);
            // If success then reset form
            if (response.success) {
                setPassword("");
                setConfirmPassword("");
                setEditMode(false);
            }

            setSaving(false);
        }
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
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            {!editMode ?
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Name</div>
                        <div className={styles.fieldValue}>{name}</div>
                    </div>

                    <div className={styles.btnGrp}>
                        <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                </>

                :

                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Name</div>
                        <input type={"text"} value={name} onChange={(e) => setName(e.target.value)} disabled={saving}/>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={saving}/>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={saving}/>
                    </div>

                    <div className={styles.btnGrp}>
                        <button className={`button ${styles.saveBtn}`} onClick={saveChanges} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                        <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>Go Back</button>
                    </div>
                </>
            }
        </div>
    );
}

export default Setting;