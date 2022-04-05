var {ShuffleArray} = require("./ArrayFunctions.js");


AssignBits = (Arr) => {
    let len = 0, Ret = {};

    for(Idx in Arr){
        let v = Arr[Idx];
        Ret[v.Name] = [len, len + v.Length - 1];
        len += v.Length;
    }

    return Ret;
}


WriteBits = (Arr, Vals) => {
    let Int32 = 0;

    for(Idx in Arr){
        Int32 |= (Vals[Idx] << Arr[Idx][0]);
    }

    return Int32;
}




module.exports.AssignBits = AssignBits;
module.exports.WriteBits  = WriteBits;