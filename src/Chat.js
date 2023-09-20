import React, {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom' ;
import axios from 'axios' ;

const Chat = ({socket}) => {

  const navigate = useNavigate() ;
  const [message , setMessage] = useState("") ;
  const [showMessages , setShowMessages] = useState([]) ;

  const sendMessage = async() =>{
      if(message !== ""){
        const user = await JSON.parse(localStorage.getItem('user')) ;
          const messageData = {
            author : user ,
            room : user._id,
            msg : message,
            time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() ,

          }

          await socket.emit("send_message" , messageData) ;
          setShowMessages([...showMessages , messageData]) ;
          setMessage("") ;
       }
  }

  const handleLogOut = () =>{
      localStorage.removeItem("user");
      navigate('/') ;
  }

  useEffect(() =>{
    socket.on("receiver_from_client2" , (data) =>{
       setShowMessages([]) ;
       setShowMessages((showMessages) => [...showMessages , data]) ;
    });
    
  },[socket]);

  console.log("This is showmessages : ",showMessages) ;

  return (
    <div>
      Welcome To Chat Support !
         <div className='chat-footer'>
         {
          showMessages && showMessages.map((msg , index)=>{
           return (msg.length>0 && msg.map((m , index)=>{
              return(
                <div key={index}>
                  <p>{m.send_by_user === true ? <><h3 className='right-chat' style={{marginLeft:"150px" }}>You</h3>  <p  style={{marginLeft:"150px" }}>{m.message}</p> </>: <><h3 className='left-chat'>Ingenium</h3> <p style={{"margin-left":"50px" }}>{m.message}</p> </>}</p>
                </div>
              )
            }) 
            ) 
          }) 
         }
            <input type='text' placeholder='Type a message...' onChange={(event) => setMessage(event.target.value)}/>
             <button onClick={() => sendMessage()}>&#9658;</button>
         </div>
         <button onClick={() => handleLogOut()}>Logout</button>
    </div>
  )
}

export default Chat