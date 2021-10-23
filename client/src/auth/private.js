import { Redirect } from "react-router-dom"
import { useAuth } from "./auth"
import { useEffect, useState } from "react"

const Private = () => {
    
    const { checkAuth } = useAuth()
    const [auth, setAuth] = useState(null)

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Private', authStatus)
        setAuth(authStatus)
    }, [])   

    const renderElement = param => {
        if(param === true) {
            return (<div><h1>This is the some Private Page</h1></div>)
        } else if (param === false) {
            return (<Redirect to={{ pathname: "/login" }} />)
        } else {
            return <></>
        }
    }

    return (
        renderElement(auth)
    )
}

export default Private;
