function CalcRow({calc}) {
    let code = calc.code;
    let bigO = calc.big_o;
    let id = calc.id;

    function handleEdit() {

    }

    function handleDelete() {
        fetch(`http://localhost:9292/calcs/delete/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
        })
        .then(r => r.json())
        .then(c => console.log(c))
    }

    return (
        <tr>
            <td>{code}</td>
            <td>{bigO}</td>
            {/* <td><span onClick={handleEdit}>📝</span></td> */}
            <td><span onClick={handleDelete}>❌</span></td>
        </tr>
    );
}

export default CalcRow;