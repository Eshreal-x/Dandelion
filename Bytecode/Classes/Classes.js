const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('./Enums.js');
var {ShuffleArray} = require("../../Library/ArrayFunctions.js");
var {AssignBits, WriteBits} = require("../../Library/BitWritter.js");





class Instruction {
    Name;
    Type;
    Chunk;
    Opcode;
    A;
    B;
    C;
    Line;
    Data;

    constructor(C, Opc) {
        this.Chunk = C;
        this.Opcode = Opc;
        this.Name = Opname[Opc];
        this.Type = InstructionMap[Opc];
    }

    SetupConstRefs = (Idx) => {
        let Opm  = Opmode[this.Opcode];
        this.Chunk.ConstantReferences[Idx] = {};

        if(Opm.B == "OpArgK" && this.B >= 256) {
            this.Chunk.ConstantReferences[Idx].B = this.Chunk.Constants[this.B - 256];
        }

        if(Opm.C == "OpArgK" && this.C >= 256) {
            this.Chunk.ConstantReferences[Idx].C = this.Chunk.Constants[this.C - 256];
            if (this.Chunk.Constants[this.C - 256].Data == null && (this.Opcode == 9 || this.Opcode == 23)) this.Chunk.ConstantReferences[Idx].C = undefined;
        }
    }
}








class Constant {
    Data;
    Type;
    constructor() {};
}





class Chunk {
    Name            = "";
    Line            = 0;
    LastLine        = 0;
    UpvalueCount    = 0;
    ParameterCount  = 0;
    VarargFlag      = 0;
    StackSize       = 0;
    Upvalues        = []; 
    

    Instructions    = [];
    Constants       = [];
    Prototypes      = [];
    ConstantReferences = [];



    constructor(c) {
        this.Name           = c.Name;
        this.Line           = c.Line;
        this.LastLine       = c.LastLine;
        this.UpvalueCount   = c.UpvalueCount;
        this.ParameterCount = c.ParameterCount;
        this.VarargFlag     = c.VarargFlag;
        this.StackSize      = c.StackSize;
    }
}



module.exports.Instruction  = Instruction;
module.exports.Constant     = Constant;
module.exports.Chunk        = Chunk;