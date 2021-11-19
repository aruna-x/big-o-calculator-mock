import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { esprima, escodegen, estraverse, getBigO } from './modules/calculator'

   
function Calculator({id, calcHistory, setCalcHistory}) {
    const [result, setResult] = useState({
        error: "empty",
        bigOEst: "",
        hotLines: []
    });
    
    //  Seed function
    function constant(n){ return n + n }
    const ast = esprima.parse(`${constant}`);
    const code = escodegen.generate(ast);

    const [codeSubmit, setCodeSubmit] = useState(code);
    const [dataType, setDataType] = useState("integer");

    function handleSubmit() {
        const {error, bigOEst, hotLines} = getBigO(dataType, codeSubmit);

        fetch(`http://localhost:9292/calcs/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({code: codeSubmit, bigOEst: bigOEst, hotLines: hotLines})
        })
        .then(r => r.json())
        .then(calcObj => {
            let newCalc = calcObj.code[0]
            console.log("Calc", newCalc)
            console.log("calc hist", calcHistory)
            setCalcHistory([...calcHistory, calcObj]);
        })
        setResult({error: error, bigOEst: bigOEst, hotLines: hotLines});
    }

    return (
        <>
            <Editor
                value={codeSubmit}
                onValueChange={code => setCodeSubmit(code)}
                highlight={code => highlight(code, languages.js)}
                padding={20}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />


            <label>Choose a data type:</label>
            <select id="dataType" name="dataType" value={dataType} onChange={(e)=>setDataType(e.target.value)}>
                <option value="integer">integer</option>
                {/* <option value="int-length-matters">integer (length matters)</option> */}
                <option value="array-ints">array of ints</option>
                {/* <option value="alpha-str">alpha only string</option> */}
                {/* <option value="alpha-num-str">alpha-numeric string</option> */}
                {/* <option value="alpha-num-spec-str">alpha-numeric and special character string</option> */}
                {/* <option value="array-rand-str">array of random strings</option> */}
            </select>
                <span>{" --> "}</span>
            <button onClick={handleSubmit}>Submit</button>

            <h3>Big O Estimate: {result.error === "empty" ? null : result.bigOEst}</h3>
                                                {/* Most Costly Lines: ${result.hotLines} */}
                <br/><br/>
        </>
    );
}


  export default Calculator;