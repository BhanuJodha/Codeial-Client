import styles from "../styles/home.module.css";

const Comment = (props) => {
    const { comment } = props;
    
    return <div className={styles.postCommentItem}>
        <div className={styles.postCommentHeader}>
            <span className={styles.postCommentAuthor}>{comment.user.name}</span>
            <span className={styles.postCommentTime}>a minute ago</span>
            <span className={styles.postCommentLikes}>{comment.likes.length}</span>
        </div>
        <div className={styles.postCommentContent}>{comment.content}</div>
        <div className={styles.commentLike}>
            <img src="https://cdn-icons-png.flaticon.com/512/833/833300.png" alt="like-icon" />
        </div>
    </div>
}

export default Comment;