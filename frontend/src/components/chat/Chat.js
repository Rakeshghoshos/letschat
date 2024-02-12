import React,{useEffect,useState} from 'react'
import './Chat.css';
import {user} from '../join/Join';
import socketIO from "socket.io-client";
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import {AiFillCloseCircle} from 'react-icons/ai';

const endPoint = "http://localhost:9090/";
let socket;

const Chat = () => {
    const [id, setid] = useState();
    const [m, setm] = useState([]);
    const send = ()=>{
        let message = document.getElementById("messageBox").value;
        socket.emit("message",{message,id});
        document.getElementById("messageBox").value = "";
    }

    // console.log(m);

    useEffect(()=>{
        socket = socketIO(endPoint,{transports: ['websocket', 'webtransport','polling'],
          reconnectionDelayMax: 10000,
          autoConnect: true,
          secure: true});

        socket.on("connect",()=>{
            console.log("connected");
            setid(socket.id);
          });
        socket.emit("joined",{user});

        socket.on("welcome",(data)=>{
            setm((prev)=> [...prev,{...data,user:"admin"}]);
            console.log(data);
        });
        socket.on("new user",(data)=>{
            setm((prev)=> [...prev,data]);
            console.log(data);
        })

        socket.on("leave",(data)=>{
            setm((prev)=> [...prev,data]);
            console.log(data);
        });

        return ()=>{
            socket.emit("disconnect");
            socket.off();
        }
    },[]);

    useEffect(() => {
      socket.on("sendMessage",(data)=>{
        setm((prev)=> [...prev,data]);
      });

      return () => {
        socket.off();
      }
    }, [m]);
    

  return (
    <div className="chat-main">
        <div className="chat-container">
            <div className="hd">
                <label>Let's Chat</label>
                <a href="/"><button><AiFillCloseCircle /></button></a>
            </div>
            <ReactScrollToBottom className="bd">
                {m.map((item,i)=><Message message={item.message} user={item.id === id ? '' : item.user} c={item.id === id ? 'right' : 'left'} />)}
            </ReactScrollToBottom>
            <div className="fd">
                <input type="text" onKeyPress={(e)=> e.key ==='Enter' ? send() : null} placeholder="messages...." id="messageBox"/>
                <button onClick={() => send()}>send</button> 
            </div>
        </div>
    </div>
  )
}

export default Chat
