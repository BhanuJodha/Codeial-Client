import React from "react";

import { getChat } from "../api";
import styles from "../styles/chat.module.css";
import { API_ORIGIN } from "../utils";

class ChatBox extends React.Component {
    constructor() {
        super();
        this.state = {
            isMinimized: false,
            chat: null,
            textBox: ""
        }
    }

    async componentDidMount() {
        const response = await getChat(this.props.user._id);
        this.setState({
            chat: response.data.chat
        })

        // subscribing for new message
        this.props.socket.on("new-message", this.newMessageListener);
    }

    componentWillUnmount(){
        this.props.socket.off("new-message", this.newMessageListener);
    }

    newMessageListener = (messageObj) => {
        if (messageObj.sender === this.props.user._id || messageObj.receiver === this.props.user._id) {
            this.state.chat.messages.unshift(messageObj);
            this.setState({
                chat: this.state.chat
            })
        }
    }

    toggleMinimize = () => {
        console.log(this.state)
        this.setState({
            isMinimized: !this.state.isMinimized
        })
    }

    sendMessage = (e) => {
        if ((e.type === "click" || e.key === "Enter") && this.state.textBox) {
            const { socket, user } = this.props;
            socket.emit("send-message", {
                chat_id: this.state.chat._id,
                message: this.state.textBox,
                receiver: user._id
            }, (response) => {
                if (response.success) {
                    this.state.chat.messages.unshift(response.messageObj);
                    this.setState({
                        chat: this.state.chat
                    })
                }
            })

            // clear text box
            this.setState({
                textBox: ""
            })
        }
    }

    render() {
        const { user } = this.props;

        return <div className={styles.chatBox}>
            <div className={styles.chatHeader}>
                <div className={styles.userName}>{user.name}</div>
                <img src={this.state.isMinimized ? "https://cdn-icons-png.flaticon.com/512/5343/5343560.png" : "https://cdn-icons-png.flaticon.com/512/6057/6057365.png"} alt="minimize" onClick={this.toggleMinimize} />
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" alt="close" onClick={e => this.props.closeChat(user)} />
            </div>

            {this.state.isMinimized ||
                <>
                    <div className={styles.messagesList}>
                        {(this.state.chat &&
                            // check sender
                            this.state.chat.messages.map((message) =>
                                message.sender === user._id ?
                                    <div className={styles.receivedContainer} key={message._id}>
                                        <img src={API_ORIGIN + user.avatar} alt="" />
                                        <p className={styles.received}>{message.content}</p>
                                    </div>
                                    :
                                    <p className={styles.send} key={message._id}>{message.content}</p>
                            ))
                            ||
                            <div className={styles.loading}>Loading...</div>
                        }
                    </div>

                    <div className={styles.messageComposer}>
                        <input
                            type="text"
                            placeholder="Type here..."
                            value={this.state.textBox}
                            onChange={e => this.setState({ textBox: e.target.value })}
                            onKeyUp={this.sendMessage}
                        />
                        <img src="https://cdn-icons-png.flaticon.com/512/565/565340.png" alt="send" onClick={this.sendMessage} />
                    </div>
                </>
            }
        </div>
    }
}

export default ChatBox;