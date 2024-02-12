import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import './Join.css';

let user = "";
export default function Join(){
  const[u,setU] = useState("");
  const handleInput = (e)=>{
    if(e.target.value != ""){
      user = e.target.value;
      setU(user);
    }
  }

  return (
    <React.Fragment>
        <div className="main">
            <div className="container">
                  <img src={process.env.PUBLIC_URL+'/icon1.jpg'} width='200' height='150'/> 
                  <label>Let's Chat</label><br />
                  <input type="text" id='userId' placeholder='enter your name' value={u} onChange={e => handleInput(e)}/><br />
                  <Link to={ u ? '/chat' : "/"}><button>Log-In</button></Link>
            </div>
        </div>
    </React.Fragment>
  )
}

export {user}