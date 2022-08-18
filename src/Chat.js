import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import './Chat.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import instance from './axios'
function Chat({messages}) {
    const [input,setInput] = useState('');
    const sendMessage = async (e)=>{
        e.preventDefault();
        await instance.post('/messages/new',{
            name:"Shreyash",
            timestamp:new Date().getTime(),
            received:false,
            message:input
        })
        setInput('');
    }
    const HandleInput = (e)=>{
        setInput(e.target.value);
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                <IconButton >
                    <SearchOutlinedIcon />
                </IconButton>
                <IconButton >
                    <AttachFileOutlinedIcon />
                </IconButton>
                <IconButton >
                    <MoreVertIcon />
                </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map(message =>{
                return (<p className={`chat__message ${message.received && "chat__receiver" }`}>
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">
                    {message.timestamp}
                </span>
                </p>)
            })}
                
            </div>
            <div className="chat__footer">
            <IconButton >
                <InsertEmoticonOutlinedIcon />
            </IconButton>
                <form action="">
                    <input type="text" placeholder='Type a message' value={input} onChange={HandleInput} />
                    <button onClick={sendMessage} type="submit" style={{borderRadius:'100%'}}><PlayArrowOutlinedIcon /></button>
                </form>
                <IconButton>
                <MicOutlinedIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat