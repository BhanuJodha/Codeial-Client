import React from "react";
import { io } from "socket.io-client";

import { API_ORIGIN, LOCAL_KEY } from "../utils/constants";
import styles from "../styles/chat.module.css";
import ChatBox from "./ChatBox";
import { fetchFriends } from "../api";

class ChatBar extends React.Component {
    constructor() {
        super();
        this.state = {
            isMinimized: true,
            socket: null,
            chatBoxes: [],
            friends: []
        }
    }

    async componentDidMount() {
        try {
            const response = await fetchFriends();

            this.setState({
                // Connecting socket and adding it to state
                socket: io(`${window.location.protocol}//${window.location.hostname}:5000`, {
                    extraHeaders: {
                        Authorization: "Bearer " + window.localStorage.getItem(LOCAL_KEY)
                    }
                }),
                // fetching user friends 
                friends: response.data.friends
            }, () => {
                const { socket } = this.state;

                socket.on("connect", () => {
                    console.log("Chat socket connected", socket.id); // x8WIv7-mJelg7on_ALbx
                });

                socket.on("disconnect", () => {
                    console.log("Chat socket disconnected");
                });

                socket.on("new-message", (messageObj) => {
                    let index = this.state.chatBoxes.find((e) => e._id === messageObj.sender)
                    if (!index) {
                        this.addChatBox(this.state.friends.find((e) => e._id === messageObj.sender));
                    }
                })
            });

        } catch (err) {
            console.error("Error in fetching friends :", err)
        }
    }

    componentWillUnmount() {
        this.state.socket.disconnect()
        this.state.socket.removeAllListeners();
    }

    sendMessage = (reciver, message) => {
        const { socket } = this.state;
        socket.emmit("new-message", {
            reciver,
            message
        })
    }

    toggleMinimize = () => {
        this.setState({
            isMinimized: !this.state.isMinimized
        })
    }

    addChatBox = (friend) => {
        if (this.state.chatBoxes.indexOf(friend) === -1){
            this.setState({
                chatBoxes: [...this.state.chatBoxes, friend]
            })
        }
    }

    closeChatBox = (friend) => {
        this.setState({
            chatBoxes: this.state.chatBoxes.filter(e => e._id !== friend._id)
        })
    }

    render() {
        return <div className={styles.chatBar}>
            <div className={styles.friendList}>

                <div className={styles.chatHeader} style={{ backgroundColor: "#C5CAE9" }}>
                    <div className={styles.userName}>Friends List</div>
                    <img src={this.state.isMinimized ? "https://cdn-icons-png.flaticon.com/512/5343/5343560.png" : "https://cdn-icons-png.flaticon.com/512/6057/6057365.png"} alt="minimize" onClick={this.toggleMinimize} />
                </div>

                {this.state.isMinimized ||
                    <div className={styles.friends}>
                        {(this.state.friends.length > 0 && this.state.friends.map(friend =>
                            <div className={styles.friendsItem} key={friend._id} onClick={() => this.addChatBox(friend)}>
                                <img
                                    src={API_ORIGIN + friend.avatar}
                                    alt="user-pic"
                                />
                                <div className={styles.friendsName}>{friend.name}</div>
                            </div>
                        ))
                        ||
                            <div className={styles.noFriends}>No Friends</div>
                        }
                    </div>
                }
            </div>

            {
                this.state.chatBoxes.map((user) => <ChatBox user={user} closeChat={this.closeChatBox} socket={this.state.socket} key={user._id}/>)
            }
        </div>
    }
}

export default ChatBar;