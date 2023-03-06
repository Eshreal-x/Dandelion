const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('../../Bytecode/Classes/Enums.js');

const fs = require('fs');
const path = require('path');


var {ShuffleArray} = require("../../Library/ArrayFunctions.js");
var {BuildIfStatement} = require("../../Library/LuaIfHandler.js");

function WriteDirToArray(Path, Func, Settings, Chunk) {
    let Arr = [];

    let li = fs.readdirSync(`${__dirname}/${Path}`);
    for(let Idx in li) Arr.push(require(`./${Path}/${li[Idx]}`)[Func](Settings, Chunk));
    
    return Arr;
}

function WriteDirToList(Path, Func, Settings, Chunk, Opcodes) {
    let Arr = {};

    let li = fs.readdirSync(`${__dirname}/${Path}`);
    for(let Idx in li) Arr[li[Idx].substring(3).substring(0,li[Idx].substring(3).length-3)] = require(`./${Path}/${li[Idx]}`)[Func](Settings, Chunk, Opcodes);
    
    return Arr;
}



module.exports.Build = async(Settings) => {
    let VM = `
    local function _Returns(...)
        return Select('#', ...), {...};
    end;
    `;

    VM += require("./VMFuncs.js").Build(Settings);
    let Arr = WriteDirToList("Opcodes", "Opcode", Settings.Chunk.Instruction.Struct, Settings.Chunk.Struct.ToIndex, Settings.Opcodes);
    let li = [];

    
    for(let Idx in Opcode)
        li.push({Code: Arr[Idx], Val: `Enum`, Check: Settings.Opcodes[Idx]})
    


    VM += BuildIfStatement(li, 0);
    VM += "\nend;".repeat(2);

    VM+=`
    local Args	= {...};

    for Idx = 0, Varargsz do
        if (Idx >= Chunk[${Settings.Chunk.Struct.ToIndex.Args}]) then
            Vararg[Idx - Chunk[${Settings.Chunk.Struct.ToIndex.Args}]] = Args[Idx + 1];
        else
            Stack[Idx] = Args[Idx + 1];
        end;
    end;

    local A, B, C	= pcall(Loop);

    if A then
        if B and (C > 0) then
            return unpack(B, 1, C);
        end;

        return;
    else
        OnError(B, InstrPoint - 1); 
    end;
    end;
    end;
    `
    
    VM+=`local run = function(BCode, Env)
        local Buffer	= Deserialize(BCode);
        
        return Wrap(Buffer, Env or getfenv(0)), Buffer;
    end;
    `

    return VM;
}

