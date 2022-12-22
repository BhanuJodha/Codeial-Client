import { useEffect, useState } from "react";
import { getPost } from "../api";
import { Post, Loader } from "../components";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        getPost(1, 50).then((data) => {
            setPosts(data.data.posts);
            setLoader(false);
        })
    }, [])

    if (loader) {
        return <div>
            <Loader />
        </div>
    }

    return <div style={{margin: "auto", width: "60%"}}>
        {posts.map(post => <Post post={post} key={post._id} />)}
    </div>
}

export default Home;