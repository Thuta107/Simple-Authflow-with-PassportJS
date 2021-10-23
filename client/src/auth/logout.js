import { useHistory, Redirect } from "react-router-dom"
import { Paper, TextField, Divider, Button } from '@mui/material'
import { useState, useEffect } from "react";
import { useAuth } from "./auth";


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)
    const { checkAuth, login } = useAuth()
    const history = useHistory()

    const handleClick = () => {
        if(email == '') {
            window.alert('Email is Empty')
            return
        } else if(password == '') {
            window.alert('Password is Empty')
            return
        } else {
            login({ email: email, password: password }, () => { 
                setEmail('')
                setPassword('')
                history.push('/')
            })
        }
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Login', authStatus)
        setAuth(authStatus)
    }, [])   

    return (
        auth ? <Redirect to={{ pathname: "/" }} /> :
        <div className='flex-card'>
        <Paper elevation={5} sx={{width:'350px',  padding:'20px'}}>
            <div style={{textAlign:'center'}}><h1>Login</h1></div>
            <Divider />
            <div style={{padding:'30px 20px 10px 20px'}}>
            <TextField label="Email" type='email' fullWidth value={email} onChange={(e) => updateEmail(e)}/>
            </div>
            <div style={{padding:'20px'}}>
            <TextField label="Password" type='password' fullWidth value={password} onChange={(e) => updatePassword(e)}/>
            </div>
            <div style={{padding:'10px 20px 20px 20px'}}>
            <Button variant='contained' sx={{width:'100%'}} onClick={() => handleClick()}> Login </Button>
            </div>
            <Divider textAlign="center"> OR </Divider>
            <div style={{padding:'20px'}}>
            <Button variant='contained' sx={{width:'100%'}}> Login using Facebook </Button>
            </div>
            <div style={{display:'flex', justifyContent:'center', padding:'20px', color:'blue'}}> 
            <div> Forgot Password? </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', padding:'20px', color:'blue'}}> 
            <div> Do not have an account? Register </div>
            </div>
        </Paper>
        </div>
    )
}


const Logout = props => {

    const [auth, setAuth] = useState(false)
    const { checkAuth, logout } = useAuth()
    const history = useHistory()

    const handleClick = () => {
        logout(() => { 
            history.push('/login')
        })
    }

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Logout', authStatus)
        setAuth(authStatus)
    }, [])   


    return (
        auth ? (<Button variant='contained' onClick={() => handleClick()}> Logout </Button>) : <></>
    )
}

export default Logout;