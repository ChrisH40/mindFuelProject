import React from 'react'
import {history} from "./AppRouter"

const LoginPage = props => {
    return <div>Login
        <button onClick={() => {
            history.push("/game")
        }}>Play as a Guest</button>
        <button>Log in with Google</button>
    </div>
}

export default LoginPage