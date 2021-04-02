import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { connect } from "react-redux";
// import { userMessage } from "./actions/messages";
let socket;

const Socket = ({ userMessage }) => {
    const endPoint = 'http://localhost:5000'
    useEffect(() => {
        socket = io(endPoint)
        socket.on('welcome', (message) => {
            console.log("Welcome Message from app.js", message)
        })
        return () => {

        }
    }, [endPoint])

    useEffect(() => {

        // Sending user message to bot

        if (userMessage) {
            console.log("This is from client side (user message)", userMessage)
            socket.emit('sendMessage', userMessage)
        }

        // Receiving message from bot
        socket.on('botMessage', (messages) => {
            messages.map((message, index) => {
                if (message.type === 'text') {

                }
                else if (message.type === 'quickReplies') {

                }
            })
        })
        return () => {

        }
    }, [userMessage])




    return (
        <div>

        </div>
    )
}
const mapStateToProps = (state) => ({
    userMessage: state.userMessage.userMessage,
});
export default connect(mapStateToProps, {})(Socket);
