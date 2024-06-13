import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from './../../assets/netflix_spinner.gif'

function Login() {

  let [sign, setSign] = useState('Sign In')
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [loading, setLoading] = useState(false)

  let user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (sign === 'Sign In') {
      await login(email, password)
    } else {
      await signUp(name, email,password)
    }
    setLoading(false)
  }

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{sign}</h1>
        <form >
          {sign === 'Sign Up' ? <input type="text" value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder='Your Name' /> : <></>}
          <input type="email" placeholder='Email' alue={email} 
          onChange={(e) => setEmail(e.target.value)}  />
          <input type="password" placeholder='Password' alue={password} 
          onChange={(e) => setPassword (e.target.value)}  />
          <button onClick={user_auth} type='submit' >{sign}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="font-switch">
          {sign === 'Sign In' ? 
            <p>New to Netflix? <span onClick={() => setSign('Sign Up')}>Sign Up</span></p> :
            <p>Already have Account? <span onClick={() => setSign('Sign In')}>Sign In</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
