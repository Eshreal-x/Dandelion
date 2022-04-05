var {ShuffleArray} = require("../../Library/ArrayFunctions.js");




module.exports.Build = (Settings) => {
    let VM = `
    local function Wrap(Chunk, Env, Upvalues)
`;

    let FChunk = [
        `\t\tlocal Instr = Chunk[${Settings.Chunk.Struct.ToIndex.Instructions}];`,
        `\t\tlocal Const = Chunk[${Settings.Chunk.Struct.ToIndex.Constants}];`,
        `\t\tlocal Proto = Chunk[${Settings.Chunk.Struct.ToIndex.Prototypes}];`
    ]
    
    VM+=ShuffleArray(FChunk).join('\n');
    VM+=`\n
        local function OnError(Err, Position)
            error(tostring(Err), Position, 0);
        end;
    `
    VM+=`
        return function(...)
            local InstrPoint, Top	= 1, -1;
            local Vararg, Varargsz	= {}, Select('#', ...) - 1;

            local GStack	= {};
            local Lupvals	= {};
            local Stack		= setmetatable({}, {
                __index		= GStack;
                __newindex	= function(_, Key, Value)
                    if (Key > Top) then
                        Top	= Key;
                    end;

                    GStack[Key]	= Value;
                end;
            });
    `
    VM+=`
            local function Loop()
                local Inst, Enum;

                while true do
                    Inst = Instr[InstrPoint];
                    Enum = Inst[${Settings.Chunk.Instruction.Struct.Opcode}];
                    InstrPoint	= InstrPoint + 1;
`



    return VM;
}

