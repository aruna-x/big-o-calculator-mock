import CalcRow from './CalcRow'

function History({calcHistory}) {
    // GET from DB
    console.log("calc history", calcHistory)

    function UserCalcs() {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Big O</th>
                        {/* <th>Edit</th> */}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {calcHistory.map(calc => <CalcRow calc={calc} key={calc.id}/>)}
                </tbody>
            </table>
        )
    }
    
    return (
        <>
            <h2>View History:</h2>
            <UserCalcs/>
        </>
    );
}

export default History;