import Calculator from "./Calculator";
import History from "./History";
import {useParams} from 'react-router-dom';

function LoggedIn({history, calcHistory, setCalcHistory}) {    
    const {id, name} = useParams();

    function handleLogout() {
        setCalcHistory([]);
        history.push('/');
    }

    return(
        <>
            <h2>Hey {name}! <button onClick={handleLogout}>logout</button></h2>
            <Calculator id={id} calcHistory={calcHistory} setCalcHistory={setCalcHistory}/>
            <History id={id} calcHistory={calcHistory}/>
        </>
    )
}

export default LoggedIn;