import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useAuth } from "./auth"

const Home = () => {
    
    const { checkAuth } = useAuth()
    const [auth, setAuth] = useState(null)

    useEffect(async () => {
        let authStatus = await checkAuth()
        console.log('From Home', authStatus)
        setAuth(authStatus)
    }, [])   

    const renderElement = param => {
        if(param === true) {
            return (<div><h1>This is the Home Page</h1></div>)
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

export default Home;
