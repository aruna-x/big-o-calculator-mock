// Libraries
import { useState } from "react";

function Login({history, setCalcHistory}) {

    const [userLogin, setUserLogin] = useState({ email: "", password: "" })

    function handleChange(e) {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        findCurrentUser(userLogin)
    }

    function findCurrentUser(userLoginAttempt) {
        const password = userLoginAttempt.password;
        const email = userLoginAttempt.email;
        fetch(`http://localhost:9292/users/${email}/${password}`)
            .then(r=>r.json())
            .then(user => {
                console.log(user.calcHistory)
                setCalcHistory(user.calcHistory);
                history.push(`/user/${user.id}/${user.name}`);
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label value="Email">Email: <br/>
                <input type="email" name="email" value={userLogin.email} onChange={handleChange} />
            </label><br/><br/>
            <label value="Password">Password: <br/>
                <input type="text" name="password" value={userLogin.password} onChange={handleChange} />
            </label> <br/><br/>
            <input type="submit" value="Login"/>

        </form>
    )
}

export default Login;