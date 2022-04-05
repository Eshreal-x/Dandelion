var {ShuffleArray} = require("../../Library/ArrayFunctions.js");
var {BuildIfStatement} = require("../../Library/LuaIfHandler.js");



module.exports.Build = (Settings) => {
    let VM="";



    let LCompareFuncs = {
        1: `Inst[${Settings.Chunk.Instruction.Struct.C}] = Inst[${Settings.Chunk.Instruction.Struct.C}] == 0;`,
        2: `Inst[${Settings.Chunk.Instruction.Struct.A}] = Inst[${Settings.Chunk.Instruction.Struct.A}] ~= 0;`,
    }


    let LKstB = {
        Nil: `Inst[${Settings.Chunk.Instruction.Struct.D}] = GetByte();`,
        Boolean: `Inst[${Settings.Chunk.Instruction.Struct.D}] = (GetByte() ~= 0);`,
        Number: `Inst[${Settings.Chunk.Instruction.Struct.D}] = GetDouble();`,
        String: `Inst[${Settings.Chunk.Instruction.Struct.D}] = Sub(GetString(), 1, -2);`,
    }


    let LKstC = {
        Nil: `Inst[${Settings.Chunk.Instruction.Struct.E}] = GetByte();`,
        Boolean: `Inst[${Settings.Chunk.Instruction.Struct.E}] = (GetByte() ~= 0);`,
        Number: `Inst[${Settings.Chunk.Instruction.Struct.E}] = GetDouble();`,
        String: `Inst[${Settings.Chunk.Instruction.Struct.E}] = Sub(GetString(), 1, -2);`,
    }
    

    let LReadData = {
        ABC: ShuffleArray([
            `Inst[${Settings.Chunk.Instruction.Struct.B}] = gBit(Data2, ${Settings.Registers.BC.B[0]}, ${Settings.Registers.BC.B[1]});`,
            `Inst[${Settings.Chunk.Instruction.Struct.C}] = gBit(Data2, ${Settings.Registers.BC.C[0]}, ${Settings.Registers.BC.C[1]});`,
        ]).join('\n\t\t\t\t\t\t'),

        ABx: ShuffleArray([
            `Inst[${Settings.Chunk.Instruction.Struct.B}] = gBit(Data2, ${Settings.Registers.Bx.B[0]}, ${Settings.Registers.Bx.B[1]});`,
        ]).join('\n\t\t\t\t\t\t'),
        AsBx: ShuffleArray([
            `Inst[${Settings.Chunk.Instruction.Struct.B}] = gBit(Data2, ${Settings.Registers.sBx.B[0]}, ${Settings.Registers.sBx.B[1]}) - 1073741824;`,
        ]).join('\n\t\t\t\t\t\t')

    } 

    let liReadData      = [];
    let liKstB          = [];
    let liKstC          = [];
    let liCompareFuncs  = [];


    for(let Idx in LReadData)       liReadData.push({Code: LReadData[Idx], Val: `Type`, Check: Settings.Chunk.Instruction.ITypes[Idx]});
    for(let Idx in LKstB)           liKstB.push({Code: LKstB[Idx], Val: `Info1`, Check: Settings.Chunk.Constant.CTypes[Idx]});
    for(let Idx in LKstC)           liKstC.push({Code: LKstC[Idx], Val: `Info2`, Check: Settings.Chunk.Constant.CTypes[Idx]});
    for(let Idx in LCompareFuncs)   liCompareFuncs.push({Code: LCompareFuncs[Idx], Val: `EqInfo`, Check: Idx});



    VM += BuildIfStatement(liReadData, 4) + "\n\n\n";
    VM += BuildIfStatement(liKstB , 4) + "\n\n\n";
    VM += BuildIfStatement(liKstC , 4) + "\n\n\n";
    VM += BuildIfStatement(liCompareFuncs , 4) + "\n\n\n";
    

    return VM;
}

