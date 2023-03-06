const fs = require('fs');
const util = require('util')
const readFile = util.promisify(fs.readFile)


var {ShuffleArray} = require("../../Library/ArrayFunctions.js");


    

function WriteDirToArray(Path, Settings) {
    let Arr = [];

    let li = fs.readdirSync(`${__dirname}/${Path}`);
    for(let Idx in li) Arr.push(require(`./${Path}/${li[Idx]}`).Build(Settings));
    
    return Arr;
}






module.exports.Build = async(Settings) => {
    let VM = `
local Select	= select;
local Byte		= string.byte;
local Sub		= string.sub;


local function gBit(Bit, Start, End)
	if End then
		local Res	= (Bit / 2 ^ Start) % 2 ^ (End - Start + 1);

		return Res - Res % 1;
	else
		local Plc = 2 ^ Start;

		if (Bit % (Plc + Plc) >= Plc) then
			return 1;
		else
			return 0;
		end;
	end;
end;

local function Deserialize(ByteString)
	local Pos = 1;
    local GetByte, GetInt32, GetDouble, GetString;
    `;



    
    VM += ShuffleArray(WriteDirToArray('TypeReaders', Settings)).join(' ');
    VM += `
    local function ChunkDecode()
        local Chunk	= {
`;
    
    for(let Idx in Settings.Chunk.Struct.Struct){
        let v = Settings.Chunk.Struct.Struct[Idx];
        switch (v.Type) {
            case "Array":
                VM+="\t\t\t{},\n";
            break;
        
            case "Number":
                VM+="\t\t\tGetByte(),\n";
            break;
        }
    }
    VM+=`\t\t}\n\n`;



    //Instructions
    Instructions = () => {
        /*Inst1
        TypeInfo 2
        EqInfo 2
        KstBInfo 3
        KstCInfo 3
        A 11
        Opcode 11
        */ 
        VM+=`
    for Idx = 1, GetInt32() do
        local Inst	= {};

        local Data1   = GetInt32();
        local Data2   = GetInt32();
`

VM += ShuffleArray([
    '\t'.repeat(4)+`local Type = gBit(Data1, ${Settings.Registers.Inst1.TypeInfo[0]}, ${Settings.Registers.Inst1.TypeInfo[1]});`,
    '\t'.repeat(4)+`local EqInfo = gBit(Data1, ${Settings.Registers.Inst1.EqInfo[0]}, ${Settings.Registers.Inst1.EqInfo[1]});`,
    '\t'.repeat(4)+`local Info1 = gBit(Data1, ${Settings.Registers.Inst1.KstBInfo[0]}, ${Settings.Registers.Inst1.KstBInfo[1]});`,
    '\t'.repeat(4)+`local Info2 = gBit(Data1, ${Settings.Registers.Inst1.KstCInfo[0]}, ${Settings.Registers.Inst1.KstCInfo[1]});`,
    '\t'.repeat(4)+`Inst[${Settings.Chunk.Instruction.Struct.Data}] = Data2;`,
    '\t'.repeat(4)+`Inst[${Settings.Chunk.Instruction.Struct.A}] = gBit(Data1, ${Settings.Registers.Inst1.A[0]}, ${Settings.Registers.Inst1.A[1]});`,
    '\t'.repeat(4)+`Inst[${Settings.Chunk.Instruction.Struct.Opcode}] = gBit(Data1, ${Settings.Registers.Inst1.Opcode[0]}, ${Settings.Registers.Inst1.Opcode[1]});`
]).join('\n')


VM+='\n\n';


            VM += require("./Instructions.js").Build(Settings);
  
    

        VM+=`
                Chunk[${Settings.Chunk.Struct.ToIndex.Instructions}][Idx]	= Inst;
            end;
        `;
    }
    
    //Constants
    Constants = () => {
        VM += `
            for Idx = 1, GetInt32() do
                local Type	= GetByte();
                local Cons;
        `;

        VM += require("./Constants.js").Build(Settings);

        VM += `
                Chunk[${Settings.Chunk.Struct.ToIndex.Constants}][Idx - 1]	= Cons;
            end;
        `;
    }

    //Prototypes
    Prototypes = () => {
        VM+=`
            for Idx = 1, GetInt32() do
                Chunk[${Settings.Chunk.Struct.ToIndex.Prototypes}][Idx - 1]	= ChunkDecode();
            end;
        `
    }


    for(let Idx in Settings.Chunk.Struct.Positions) {
        switch (Settings.Chunk.Struct.Positions[Idx]) {
            case "Instructions":
                Instructions();
            break;
            case "Constants":
                Constants();
            break;
            case "Prototypes":
                Prototypes();
            break;
        }
    }



    VM+=`
        return Chunk;
    end;



        return ChunkDecode();
    end;
    `;

    //console.log(VM);
    return VM;
}

