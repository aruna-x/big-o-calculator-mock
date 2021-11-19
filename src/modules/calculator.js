/**
 *   REQUIRES
 */ 

const esprima = require('esprima');
const escodegen = require('escodegen');
const estraverse = require('estraverse');

function getBigO(dataType, code){
    // Char sets
    // const alnum = 'abcdefghijklmnopqrstuvwxyz0123456789';
    // const alpha = 'abcdefghijklmnopqrstuvwxyz';
    // const num = '0123456789';

    // Declare data sets
        let sets = [];
        let n = [16, 32, 128, 256, 512, 1024, 2048, 4096]

    // Populate data sets
        switch(dataType) {
            case "integer":
                sets = n;
                break;
            case "int-length-matters":
                sets = n;
                n = [2,2,3,3,3,4,4,4];
                break;
            case "alpha-str":
            case "alpha-num-str":
            case "alpha-num-spec-str":
            case "array-ints":
                for (let i=0; i<8; i++){
                    let arr = [];
                    for (let j=0; j<n[i]; j++) {
                        arr.push(Math.floor(Math.random()*9))
                    }
                    sets[i] = arr;
                }
                break;
            case "array-rand-str":
            default:
                break;
        }

    //What if they do not use ; and the string that's sent to here includes \n ... something like "function foo() {let sum=0\n let splitter = value.toString().split("") .... etc.}"
    //what if they use "" in the code 
    //what about +=, -=
    
    // BUILD AST 

        const ast = esprima.parse(`${code}`);


    // MODIFY AST

        estraverse.traverse(ast, {
            enter: function(node) {
                if (node.type === "BlockStatement") {
                    injectBlockStatements(node);
                }
            }
        });


        // MUST change arrow functions to named functions because the parser add ; to the end of an arrow function (donno why?!) and i'm unable to immediately invoke

        function injectBlockStatements(node) {
            let addCounter = {
                type: 'ExpressionStatement', 
                expression: {
                    type:'AssignmentExpression',
                    left: {name: 'counter', type: 'Identifier'},
                    operator: '+=',
                    right: {value: 1, type: 'Literal'}
                }
            }
            return node.body.unshift(addCounter)
        }


    // CODE GEN / UNPARSE


        const modified = escodegen.generate(ast).replaceAll("\n", "");


    //  CALCULATE BIG O APPROX

        // grab counters
        const counters = [];
        for (let i=0; i<8; i++) {
            let counter = 0;
            counters.push(eval(`(()=>{(${modified})(sets[${i}]); return counter;})()`));
        }

        let bigOEst;
        if (counters[0] === counters[7]) {
            bigOEst = "O(1)";
        }
        else{
            // make big o array
            // ADD: log(n) and (2^n)
            const ratioArr = [];
            for (let i=0; i<8; i++) {
                const tempArr = [];
                    tempArr.push(counters[i] / Math.log(n[i]));
                    tempArr.push(counters[i] / n[i]**0.5);
                    tempArr.push(counters[i] / n[i]);
                    tempArr.push(counters[i] / n[i]*Math.log(n[i]));
                    tempArr.push(counters[i] / n[i]**2);
                ratioArr.push(tempArr);
            }

            const metaRatioArr = [];

            for (let i=0; i<5; i++) {
                metaRatioArr.push(Math.abs(1 - ratioArr[6][i]/ratioArr[7][i]));
            }

            let minDiff = [metaRatioArr[0], 0];
            for (let i=0; i<5; i++) {
                if (metaRatioArr[i] < minDiff[0]){
                    minDiff = [metaRatioArr[i], i];
                }
            }
            let est; 
            switch(minDiff[1]) {
                case 0:
                    est = "log(n)";
                    break;
                case 1:
                    est = "n^(1/2)"
                    break;
                case 2:
                    est = "n"
                    break;
                case 3:
                    est = "n * log(n)"
                    break;
                case 4:
                    est = "n^2"
                    break;
                default:
                    let error = "There was an error, try again!";
                    break;
            }
            bigOEst = `O(${est})`;

            // console.log("metaRatioArr", metaRatioArr)
        }

    // RETURN :   {error, bigO estimate, hottest lines}
    return {error: "none", bigOEst: bigOEst, hotLines: []}
}


export { esprima, escodegen, estraverse, getBigO }