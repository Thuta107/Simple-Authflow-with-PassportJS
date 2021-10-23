import { useHistory, Redirect } from "react-router-dom"
import { Paper, TextField, Divider, Button } from '@mui/material'
import { useState, useEffect } from "react";
import { useAuth } from "./auth";


const SignUp = props => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState(false)
  const { checkAuth, register } = useAuth()
  const history = useHistory()

    const handleClick = () => {
        if(name == '') {
            window.alert('User Name is Empty')
            return 
        } else if(email == '') {
            window.alert('Email is Empty')
            return
        } else if(password == '') {
            window.alert('Password is Empty')
            return
        } else {
            register({ username: name, email: email, password: password }, () => {
                setName('')
                setEmail('')
                setPassword('')
                history.push('/login')
            })
        }
    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Sign Up', authStatus)
        setAuth(authStatus)
    }, [])   

    return (
        auth ? <Redirect to={{ pathname: "/" }} /> :
        <div className='flex-card'>
            <Paper elevation={5} sx={{width:'350px',  padding:'20px'}}>
            <div style={{textAlign:'center'}}><h1>Sign Up</h1></div>
            <Divider />
            <div style={{padding:'30px 20px 10px 20px'}}>
                <TextField label="Username" fullWidth value={name} onChange={(e) => updateName(e)}/>
            </div>
            <div style={{padding:'20px'}}>
                <TextField label="Email" type='email' fullWidth value={email} onChange={(e) => updateEmail(e)}/>
            </div>
            <div style={{padding:'20px'}}>
                <TextField label="Password" type='password' fullWidth value={password} onChange={(e) => updatePassword(e)}/>
            </div>
            <div style={{padding:'10px 20px 20px 20px'}}>
                <Button variant='contained' sx={{width:'100%'}} onClick={() => handleClick()}> Register </Button>
            </div>
            <Divider textAlign="center"> OR </Divider>
            <div style={{padding:'20px'}}>
                <Button variant='contained' sx={{width:'100%'}}> Register using Facebook </Button>
            </div>
            </Paper>
        </div>
    )
}

export default SignUp;
