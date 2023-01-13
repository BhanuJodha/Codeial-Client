import moment from "moment";
import { useAuth } from '../../hooks';

import styles from "../../styles/home.module.css";

const Comment = (props) => {
    const { comment, post, deleteComment, toggleLike } = props;
    const auth = useAuth();

    return <div className={styles.postCommentItem}>
        <div className={styles.postCommentHeader}>
            <span className={styles.postCommentAuthor}>{comment.user.name}</span>
            <span className={styles.postCommentTime}>{moment(new Date(comment.createdAt)).fromNow()}</span>
            <span className={styles.postCommentLikes}>{comment.likes.length} Likes</span>
            {auth.user && (comment.user._id === auth.user._id || auth.user._id === post.user._id) &&
                <span className={styles.postCommentDelete} onClick={() => deleteComment(comment._id)}>Delete</span>
            }
        </div>
        <div className={styles.postCommentContent}>{comment.content}</div>
        <div className={styles.commentLike}>
            <img
                src={(auth.user && comment.likes.find(like => like.user === auth.user._id) &&
                    "https://cdn-icons-png.flaticon.com/512/210/210545.png")
                    ||
                    "https://cdn-icons-png.flaticon.com/512/833/833300.png"
                }
                alt="likes-icon"
                onClick={() => toggleLike(comment, "Comment")}
            />
        </div>
    </div>
}

export default Comment;