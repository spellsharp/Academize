import axios from "axios";
import { Link } from "react-router-dom";
import {useState} from "react";
import '../App.css';
import Navbar from "./Navbar";

 const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const submit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
          };
try{
        const {data} = await axios.post('http://localhost:8000/token/', user ,{headers: {
            'Content-Type': 'application/json'
        }}, {withCredentials: true});

        console.log(data)
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location.href = '/home'
    } catch(error) {
      setErrorMessage('Incorrect username or password');
    }
  }
    return(
      <div className="login">
        <div className="Auth-form-container" >
        <div className="Auth-box">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label style={{padding:'10px'}}>Username</label>
              <input
                style={{borderRadius:'10px', padding:'10px'}}
                className="form-control mt-1"
                placeholder="Enter Username"
                name='username'
                type='text'
                value={username}
                required
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group mt-3">
              <label style={{padding:'10px'}}>Password</label>
              <input 
                style={{borderRadius:'10px', padding:'10px'}}
                name='password'
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            
            {errorMessage && <p style={{color: 'red', fontSize: '15px' }}>{errorMessage}</p>} {/* Render error message if it exists */}          
            
            <div className="d-grid gap-2 mt-3">
              <br />
              <button style={{cursor:'pointer', background: 'white', borderRadius:'7px', fontSize:'15px', padding:'7px', color:'black'}} type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            
            <Link to='/register' style={{color:'lightblue',fontSize:'15px', textDecoration:'underline'}}>
            Don't Have An Account?
            </Link>
          </div>
        </form>
    </div>
    </div>
    </div>
    )
  }
export default Login;


