

var {ShuffleArray} = require("./ArrayFunctions.js");



module.exports.BuildIfStatement = (Arr, Spacing, Shuffle = true) => {
    if(Shuffle) Arr = ShuffleArray(Arr);

    let C = "\n";

    for(let Idx in Arr){
        let v = Arr[Idx];
        if(Idx == 0) C+= `${"\t".repeat(Spacing)}if ${v.Val} == ${v.Check} then\n`;
        if(Idx != 0) C+= `${"\t".repeat(Spacing)}elseif ${v.Val} == ${v.Check} then\n`;
        C += `${"\t".repeat(Spacing)}\t${v.Code}\n`;
    }

    C+=`${"\t".repeat(Spacing)}end;`
    return C;
}

