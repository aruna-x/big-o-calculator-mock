// Libraries
import { Switch, Route, useHistory } from 'react-router-dom';
import React, { useState } from "react";
// import styled from 'styled-components';

// Components
import NotLoggedIn from './NotLoggedIn';
import LoggedIn from './LoggedIn';

function App() {
    const history = useHistory();
    const [calcHistory, setCalcHistory] = useState(null);

    return (
        <>
            <h1>Big O Calculator</h1>
            <Switch>
                <Route exact path="/">
                    <NotLoggedIn history={history} setCalcHistory={setCalcHistory}/>
                </Route>
                <Route path="/user/:id/:name">
                    <LoggedIn history={history} setCalcHistory={setCalcHistory} calcHistory={calcHistory} />
                </Route>
            </Switch>
        </>
    );
}

export default App;