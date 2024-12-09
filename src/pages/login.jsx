import { useState, useEffect } from "react";
import axios from "axios";
import '../css/login.css'



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isLoggedIn = () => {
        const token = localStorage.getItem('token')
        if(token){
            window.location.href = '/dashboard'
            return
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    async function  handleLogin (e){
        e.preventDefault()
        const res = await axios.post('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/loginAPI.php', {
            username: username,
            password: password
        })
        console.log(res.data)
       if(res.data.status){
            localStorage.setItem('token', JSON.stringify(res.data.user))
            window.location.reload()
       }
    }


    return(

        <div className="whole">

            
        <div className="container">
        <div className="titles">
          <div className="HC-Assist">HC-Assist</div>
          <div className="subtitle">A Health Center Management System</div>
        </div>
  
        <div className="loginForm">
          <div className="formContent">
            <form onSubmit={handleLogin} method="post">
              <label htmlFor="username">Username:</label> <br />
              <input
                type="text"
                id="username"
                name="username"
                className="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <br />
              <label htmlFor="password">Password:</label> <br />
              <input
                type="password"
                id="password"
                name="password"
                className="password"
                required
                onChange={(e) => setPassword(e.target.value) }
              />
              <br />
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
  
        <div className="design">
          <div className="left-slantbox">2</div>
          <div className="right-slantbox">2</div>
  
          <div className="image-container">
            <img src="assets/Login_doc.png" alt="Login illustration" style={{ height: '100vh' }} />
          </div>
        </div>
      </div>

        </div>

    )
};


export default Login     