import { useEffect, useState } from "react";
import { Post, Loader, FriendsList, CreatePost } from "../components";
import { useAuth, usePosts } from "../hooks";

import styles from "../styles/home.module.css";

const Home = () => {
    // Local loader for rendering home
    const [localLoader, setLocalLoader] = useState(true);

    const {loader, posts} = usePosts();
    const auth = useAuth();

    useEffect(() => {
        setLocalLoader(false);
    }, [])

    if (loader || localLoader) {
        return <div>
            <Loader />
        </div>
    }

    return <div className={styles.home}>
        <div className={styles.postsList}>
            <CreatePost />
            {posts.map(post => <Post post={post} key={post._id} />)}
        </div>

        {auth.user && 
            <FriendsList />
        }
    </div>
}

export default Home;