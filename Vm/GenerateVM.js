const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('../Bytecode/Classes/Enums.js');
const {Instruction, Constant, Chunk} = require('../Bytecode/Classes/Classes.js');
const fs = require('fs');



const LDeserializer = require("./Lua Deserializer/Build.js")
const CVM = require("./CVM/Build.js")

module.exports.Build = async(Settings) => {
    let VM = "";
    VM += await LDeserializer.Build(Settings);
    VM += `\n\n`;
    VM += await CVM.Build(Settings);

    return VM;
}

