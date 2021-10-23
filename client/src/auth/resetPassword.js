import { useHistory, Redirect, useRouteMatch } from "react-router-dom"
import { Paper, TextField, Divider, Button } from '@mui/material'
import { useState, useEffect } from "react";
import { useAuth } from "./auth";


const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)
    const { checkAuth, resetPassword } = useAuth()
    const history = useHistory()
    const match = useRouteMatch();

    const handleClick = () => {
        if(password == '') {
            window.alert('Password is Empty')
            return
        } else {
            resetPassword(match.url, { password: password }, () => { 
                setPassword('')
                history.push('/login')
            })
        }
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Reset Password', authStatus)
        setAuth(authStatus)
    }, [])   

    return (
        auth ? <Redirect to={{ pathname: "/" }} /> :
        <div className='flex-card'>
        <Paper elevation={5} sx={{width:'350px',  padding:'20px'}}>
            <div style={{textAlign:'center'}}><h1>Reset Password</h1></div>
            <Divider />
            <div style={{padding:'20px'}}>
                <TextField label="Password" type='password' fullWidth value={password} onChange={(e) => updatePassword(e)}/>
            </div>
            <div style={{padding:'10px 20px 20px 20px'}}>
                <Button variant='contained' sx={{width:'100%'}} onClick={() => handleClick()}> Reset Password </Button>
            </div>
            <div style={{display:'flex', justifyContent:'center', padding:'20px', color:'blue',  cursor:'pointer'}} onClick={() => history.push('/login')}> 
                Back to Login
            </div>
        </Paper>
        </div>
    )
}

export default ResetPassword;
