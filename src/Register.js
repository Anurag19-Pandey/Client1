import React,{useState} from 'react'
import axios from 'axios' ;
import {useNavigate} from 'react-router-dom' ;

const Register = () => {

    const navigate = useNavigate() ;
    
    const [name , setName] = useState("") ;
    const [password , setPassword] = useState("") ;

    const handleSubmit = async(event) =>{
        event.preventDefault() ;

        const {data} = await axios.post("http://localhost:5000/register" , {
            name , 
            password
        }) ;
        console.log(data) ;

        if(data.status){
           localStorage.setItem('user' , JSON.stringify(data.user)) ;
            navigate('/login') ;
        }
    }

  return (
    <div> 
      
        <form onSubmit={(event) => handleSubmit(event)}>
            <input type='text' placeholder='Name' onChange={(event) => setName(event.target.value)}/><br/>
            <input type='password' placeholder='Password' onChange={(event) => setPassword(event.target.value)}/><br/>
            <button type='submit'>Register</button>
        </form>
  
    </div>
  )
}

export default Register