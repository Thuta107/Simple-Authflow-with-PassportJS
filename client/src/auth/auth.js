import { createContext, useState, useContext } from "react";
import axios from 'axios'

/** Authentication Context */
const AuthContext = createContext()

function useProvideAuth() {

    // Login to the System 
    const login = (data, callback) => {
        axios.post('./login', data)
        .then(response => {
            window.alert(response)
            if(response.status == 200) {
                console.log('Login', response.data)
                window.alert('Logged In')
                window.sessionStorage.setItem('user', JSON.stringify(response.data.user))
                callback() // Go to Home
            }
        })
        .catch(error => {
            console.log(error)
            window.alert(error)
        })
    }


    // Sign Up for the System
    const register = (data, callback) => {
        axios.post('/signup', data)
        .then(response => {
            window.alert('Registered Complete')
            if(response.status == 200) {
                console.log('Register', response.data)
                window.alert(response.statusText)
                callback() // Go back to Login
            }
        })
        .catch(error => {
            console.log(error)
            window.alert(error)
        })
    }


    // Logout of the System
    const logout = callback => {
        axios.post('/logout', {})
        .then(response => {
            window.alert('Logged Out')
            if(response.status == 200) {
                console.log('Logout', response)
                callback() // Go back to Login
            }
        }).catch(error => console.log(error))
    }


    // Forgot Password
    const forgotPassword = (data, callback) => {
        axios.post('/forgot', data)
        .then(response => {
            window.alert('Forgot Password Success')
            if(response.status == 200) {
                window.alert('Forgot Password', response.data)
                console.log('Forgot Password', response)
                callback()
            }
        }).catch(error => console.log(error))
    }
    

    // Reset Password
    const resetPassword = (url, data, callback) => {
        axios.post(url, data)
        .then(response => {
            window.alert('Reset Password Success')
            if(response.status == 200) {
                window.alert('Reset Password', response.data)
                console.log('Reset Password', response)
                callback() // Go back to Login
            }
        }).catch(error => console.log(error))
    }


    // Check whether user is authenticated
    const checkAuth = async () => {
        try {
            let response = await axios.get('/auth')
            console.log('Check Auth', response)

            if(response.status == 200 && response.data.auth) {
                return true
            } else {
                return false
            }

        } catch(e) {
            console.log(e)
            window.alert(e)
        }
    }

    return { checkAuth, login, register, logout, forgotPassword, resetPassword };
}


/**
 * Provider for Auth Context
 */
function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}


function useAuth() {
  return useContext(AuthContext);
}

export { ProvideAuth, useAuth }