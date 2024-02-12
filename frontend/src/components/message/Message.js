import React from 'react';
import './Message.css';

const Message = ({message,user,c}) => {
if(user){
    return (
        <div className={`mbox ${c}`}>
            {`${user} : ${message}`}
        </div>
      )
  }else{
    return (
        <div className={`mbox ${c}`}>
            {`you : ${message}`}
        </div>
      )
  }
}

export default Message