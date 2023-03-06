const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('../Bytecode/Classes/Enums.js');
const {Instruction, Constant, Chunk} = require('../Bytecode/Classes/Classes.js');
var {ShuffleArray, ListToArray} = require("../Library/ArrayFunctions.js");
var {AssignBits, WriteBits} = require("../Library/BitWritter.js");
const fs = require('fs');






var Settings = {
    Registers: {},
    Opcodes: {},

    Chunk: {
        Struct: {
            Struct: [
            {Name: "Instructions",  Type: "Array"},
            {Name: "Constants",     Type: "Array"},
            {Name: "Prototypes",    Type: "Array"},
            {Name: "Upvalues",      Type: "Number"},
            {Name: "Args",          Type: "Number"},
        ],
            ToIndex: {},
            Positions: ShuffleArray(["Instructions", "Constants", "Prototypes"])
        },

        Instruction: {
            Struct: {},
            ITypes: {},
        },

        Constant: {
            CTypes: {},
        },
    }
}



ListToArray([
    {Name: "Opcode"},
    {Name: "A"},
    {Name: "B"},
    {Name: "C"},
    {Name: "D"},
    {Name: "E"},
    {Name: "Data"},
], Settings.Chunk.Instruction.Struct, 1);

ListToArray([
    {Name: "ABC"},
    {Name: "ABx"},
    {Name: "AsBx"},
], Settings.Chunk.Instruction.ITypes, 0);

ListToArray([
    {Name: "Nil"},
    {Name: "Boolean"},
    {Name: "Number"},
    {Name: "String"},
], Settings.Chunk.Constant.CTypes, 1);

ListToArray([
    {Name: "Move"},
    {Name: "Loadk"},
    {Name: "LoadBool"},
    {Name: "LoadNil"},
    {Name: "GetUpval"},
    {Name: "GetGlobal"},
    {Name: "GetTable"},
    {Name: "SetGlobal"},
    {Name: "SetUpval"},
    {Name: "SetTable"},
    {Name: "NewTable"},
    {Name: "Self"},
    {Name: "Add"},
    {Name: "Sub"},
    {Name: "Mul"},
    {Name: "Div"},
    {Name: "Mod"},
    {Name: "Pow"},
    {Name: "Unm"},
    {Name: "Not"},
    {Name: "Len"},
    {Name: "Concat"},
    {Name: "Jmp"},
    {Name: "Eq"},
    {Name: "Lt"},
    {Name: "Le"},
    {Name: "Test"},
    {Name: "TestSet"},
    {Name: "Call"},
    {Name: "TailCall"},
    {Name: "Return"},
    {Name: "ForLoop"},
    {Name: "ForPrep"},
    {Name: "TForLoop"},
    {Name: "SetList"},
    {Name: "Close"},
    {Name: "Closure"},
    {Name: "VarArg"},
], Settings.Opcodes, 0);



Settings.Chunk.Struct.Struct = ShuffleArray(Settings.Chunk.Struct.Struct);
ListToArray(Settings.Chunk.Struct.Struct, Settings.Chunk.Struct.ToIndex, 1, false);







/*Inst1
   TypeInfo 2
   EqInfo 2
   KstBInfo 3
   KstCInfo 3
   A 11
   Opcode 11
*/ 
let Inst1 = ShuffleArray([{Name:'TypeInfo', Length: 2}, {Name:'EqInfo', Length: 2}, {Name:'KstBInfo', Length: 3}, {Name:'KstCInfo', Length: 3}, {Name:'A', Length: 11}, {Name:'Opcode', Length: 11}]);



/*Inst2
    B 16
    C 16
    ||
    Bx 32
    ||
    sBx 32
*/ 
let BC = ShuffleArray([{Name: 'C', Length: 16}, {Name: 'B', Length: 16}]);
let Bx = ShuffleArray([{Name: 'B', Length: 31}]);
let sBx = ShuffleArray([{Name: 'B', Length: 31}]);

console.log(AssignBits(Inst1));
console.log(AssignBits(BC));
console.log(AssignBits(Bx));
console.log(AssignBits(sBx));

Settings.Registers.Inst1 = AssignBits(Inst1);
Settings.Registers.BC = AssignBits(BC);
Settings.Registers.Bx = AssignBits(Bx);
Settings.Registers.sBx = AssignBits(sBx);









//console.dir( Settings, {'maxArrayLength': null, 'depth': null});



module.exports.Build = () => {
    return Settings;
}

