// Libraries
import { useState } from 'react'


function SignUp({setCalcHistory, history}) {

    const [newUser, setNewUser] = useState({
        first_name: "",
        email: "",
        password: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
        createNewUser(newUser)
    }

    function handleChange(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    function createNewUser(newUserAttempt) {
        fetch('http://localhost:9292/create-user', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(newUserAttempt)
        })
        .then(r => r.json())
        .then(user => {
            setCalcHistory([]);
            history.push(`/user/${user.id}/${user.name}`);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label value="First Name">First Name:<br/>
                <input type='text' name="first_name" value={newUser.first_name} onChange={handleChange} />
            </label> <br/><br/>
            <label value="Email">Email:<br/>
                <input type="email" name="email" value={newUser.email} onChange={handleChange} />
            </label> <br/><br/>
            <label value="Password">Password:<br/>
                <input type="text" name="password" value={newUser.password} onChange={handleChange} />
            </label><br/><br/>
            <input type="submit" value="Sign Up"/>
        </form>
    );
}

export default SignUp;