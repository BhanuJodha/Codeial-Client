import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePosts } from '../../hooks';
import styles from '../../styles/home.module.css';

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    const {addPost} = usePosts();

    const handleAddPostClick = async () => {
        setAddingPost(true);
        const toastID = toast.loading("Adding Post...");
        const response = await addPost(post, toastID);
        if (response.success)
            setPost("");
        setAddingPost(false);
     };

    return (
        <div className={styles.createPost}>
            <textarea
                placeholder='Post a new thread...'
                className={styles.addPost}
                value={post}
                onChange={(e) => setPost(e.target.value)}
            />

            <div>
                <button
                    className={styles.addPostBtn}
                    onClick={handleAddPostClick}
                    disabled={addingPost}
                >
                    {addingPost ? 'Posting...' : 'Post'}
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
