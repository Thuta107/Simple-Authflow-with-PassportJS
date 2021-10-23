import { useHistory, Redirect } from "react-router-dom"
import { Paper, TextField, Divider, Button } from '@mui/material'
import { useState, useEffect } from "react";
import { useAuth } from "./auth";


const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [auth, setAuth] = useState(false)
    const { checkAuth, forgotPassword } = useAuth()
    const history = useHistory()

    const handleClick = () => {
        if(email == '') {
            window.alert('Email is Empty')
            return
        } else {
            forgotPassword({ email: email }, () => {
                setEmail('')
            })
        }
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Forgot Password', authStatus)
        setAuth(authStatus)
    }, [])   

    return (
        auth ? <Redirect to={{ pathname: "/" }} /> :
        <div className='flex-card'>
        <Paper elevation={5} sx={{width:'350px',  padding:'20px'}}>
            <div style={{textAlign:'center'}}><h1> Forgot Password </h1></div>
            <Divider />
            <div style={{padding:'30px 20px 10px 20px'}}>
                <TextField label="Email" type='email' fullWidth value={email} onChange={(e) => updateEmail(e)}/>
            </div>
            <div style={{padding:'10px 20px 20px 20px'}}>
                <Button variant='contained' sx={{width:'100%'}} onClick={() => handleClick()}> Send Link </Button>
            </div>
            <div style={{display:'flex', justifyContent:'center', padding:'20px', color:'blue', cursor:'pointer'}} onClick={() => history.push('/login')}> 
                Back to Login
            </div>
        </Paper>
        </div>
    )
}

export default ForgotPassword;
