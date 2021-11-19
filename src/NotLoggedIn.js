// Libraries
import { useState } from 'react';

// Components
import Login from "./Login";
import SignUp from "./SignUp";

function NotLoggedIn({history, setCalcHistory}){

    const [signUp, setSignUp] = useState(true)

    const OfferLogin = () => {
        if (signUp){
            return <SignUp history={history} setCalcHistory={setCalcHistory}/>
        }
        else {
            return <Login history={history}setCalcHistory={setCalcHistory}/>
        }
    }

    return(
        <>
            <OfferLogin/>
            <span onClick={()=>setSignUp(true)}>sign up</span> * <span onClick={()=>setSignUp(false)}>login</span>
        </>
    );

}

export default NotLoggedIn;