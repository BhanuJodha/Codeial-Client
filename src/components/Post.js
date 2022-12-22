import styles from "../styles/home.module.css";
import Comment from "./Comment";

const Post = (props) => {
    const { post } = props;
    
    return <div className={styles.postsList}>
        <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                        alt="user-pic"
                    />
                    <div>
                        <span className={styles.postAuthor}>{post.user.name}</span>
                        <span className={styles.postTime}>a minute ago</span>
                    </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/833/833300.png"
                            alt="likes-icon"
                        />
                        <span>{post.likes.length}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                            alt="comments-icon"
                        />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div className={styles.postCommentBox}>
                    <input placeholder="Start typing comment here..." />
                </div>

                <div className={styles.postCommentsList}>
                    {post.comments.map((comment) => <Comment comment={comment} key={comment._id} />)}
                </div>
            </div>
        </div>
    </div >
}

export default Post;