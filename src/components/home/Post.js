import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { usePosts, useAuth } from "../../hooks";
import moment from "moment/moment";

import styles from "../../styles/home.module.css";
import Comment from "./Comment";
import { API_ORIGIN } from "../../utils";

const Post = (props) => {
    const [commentBox, setCommentBox] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = props;
    const { addComment: createComment, removeComment, removePost, like } = usePosts();
    const auth = useAuth();

    const addComment = async () => {
        setLoading(true);
        const toastID = toast.loading("Adding comment...");
        const response = await createComment(post, commentBox, toastID);
        if (response.success)
            setCommentBox("");
        setLoading(false);
    }

    const deleteComment = async (comment_id) => {
        if (!loading) {
            setLoading(true);
            const toastID = toast.loading("Deleting comment...")
            await removeComment(post, comment_id, toastID);
            setLoading(false);
        }
    }

    const deletePost = async () => {
        if (!loading) {
            setLoading(true);
            const toastID = toast.loading("Deleting post and associated comments...");
            await removePost(post._id, toastID);
            setLoading(false);
        }
    }

    const toggleLike = async (reference, onModel) => {
        if (!loading) {
            setLoading(true);
            await like(reference, onModel);
            setLoading(false);
        }
    }

    return <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
                <Link to={`/user/${post.user._id}`}>
                    <img
                        src={API_ORIGIN + post.user.avatar}
                        alt="user-pic"
                    />
                </Link>
                <div>
                    <span className={styles.postAuthor}>{post.user.name}</span>
                    <span className={styles.postTime}>{moment(new Date(post.createdAt)).fromNow()}</span>
                </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
                <div className={styles.postLike}>
                    <img
                        src={(post.likes.find(like => like.user === auth.user._id) &&
                            "https://cdn-icons-png.flaticon.com/512/210/210545.png")
                            ||
                            "https://cdn-icons-png.flaticon.com/512/833/833300.png"
                        }
                        alt="likes-icon"
                        onClick={() => toggleLike(post, "Post")}
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

                {auth.user && auth.user._id === post.user._id &&
                    <div className={styles.postDeleteIcon}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3132/3132919.png"
                            alt="delete-icon"
                            onClick={deletePost}
                        />
                        <span>Remove</span>
                    </div>
                }
            </div>
            <div className={styles.postCommentBox}>
                <input
                    placeholder="Start typing comment here..."
                    value={commentBox}
                    onKeyDown={(e) => { e.key === "Enter" && addComment() }}
                    onChange={(e) => setCommentBox(e.target.value)}
                    disabled={loading} />
            </div>

            <div className={styles.postCommentsList}>
                {post.comments.map((comment) => <Comment comment={comment} post={post} deleteComment={deleteComment} toggleLike={toggleLike} key={comment._id} />)}
            </div>
        </div>
    </div>
}

export default Post;