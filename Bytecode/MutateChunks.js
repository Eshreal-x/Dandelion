const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('./Classes/Enums.js');
const {Instruction, Constant, Chunk} = require('./Classes/Classes.js');
var {ShuffleArray} = require("../Library/ArrayFunctions.js");
var {AssignBits, WriteBits} = require("../Library/BitWritter.js");
const { Console } = require('console');


/*ShuffleArray = (Arr) => {// to overwrite global shuffle for testing
    let Idx = Arr.length,  RIdx;

    while (0 !== Idx) {
        RIdx = Math.floor(Math.random() * Idx);
        Idx--;

        [Arr[Idx], Arr[RIdx]] = [Arr[RIdx], Arr[Idx]];
    }

    return Arr;
}*/


MakeId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}






module.exports.Mutate = (LChunk, Settings) => {

    function Instructions(Chunk) {
        let Sizecode = Chunk.Instructions.length;
        let Consts = Chunk.Constants.map(v => v);

        //Remap constants & add junk constants.
        let AddKstAmount = Math.floor(80/(15+100*0.997**Sizecode));
        let JunkStrings = [ 
            'game', 'HttpGet', 'HttpPost', 'syn', 'require', 'loadstring', 'assert', 'load', 'workspace',
            'tonumber', 'gmatch', 'gsub', 'string', 'tostring', 'pcall', 'error', 'setmetatable', 'getrawmetatable', 'getmetatable',
            'rawget', 'rawset', 'char',' byte', 'len', 'assert', 'gInt8', 'gString', 'gSizet', 'gInt32', 'gInt64', 'gInt', 'Args',
            'Name', 'Vargs', 'Stack', 'Decode', 'encrypt', 'decrypt', 'encode', 'OpargR', 'OpargK', 'constants', 
            'whitelisted', 'pairs', 'select', 'assert', 'pcall', 'typeof',
            'type', 'unpack', 'coroutine', 'table', 'rawget', 'rawset', 'new', '__instr__', '__const__', '__init__',
            'tostring', 'Chunk', 'sizeof', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'debug', 'GetUpvalues','GetConstants', 'GetStack', 'true', 'false', 'else', 'if', 'Whitelisted', 'Blacklisted', 'Winning',
            ':)', 'Congratulations you played yourself', '?', 'Stop looking at this', 'Wasting time?', 'Goodluck lmao', 'Google it. Simple. Delete this and fuck off. NOW!'
        ];
        for (let Idx = 0; Idx < AddKstAmount; Idx++) JunkStrings.push('https://pastebin.com/raw/'+MakeId(8));

        let JunkNumbers = [];

        for (let Idx = 0; Idx < 1000; Idx++) JunkNumbers.push(Idx);
        for (let Idx = 0; Idx < 50; Idx++) JunkNumbers.push(Math.floor(Math.random()*9e9));
      

    
        let AddAmount = Consts.length;
        
        for (let Idx = 0; Idx < AddAmount; Idx++) Consts.push({ Data: JunkStrings[Math.floor(Math.random()*JunkStrings.length)], Type: 'String' });
        for (let Idx = 0; Idx < AddAmount; Idx++) Consts.push({ Data: JunkNumbers[Math.floor(Math.random()*JunkNumbers.length)], Type: 'Number' });



        let newConst = ShuffleArray(Consts.map((v, i) => v))
       


        let ConstIdx = {};  
        for (let oc in Consts) {
            for (let nc in newConst) {

                if(Consts[oc] == newConst[nc]) {
                    ConstIdx[oc] = nc;
                }
            }
        }
        

        Chunk.Constants = newConst;


        for (let Idx = 0; Idx < Sizecode; Idx++) {
            let i = Chunk.Instructions[Idx];



            switch (Opname[i.Opcode]) {
                // Only Kst(n)
                case 'Loadk': // Kst(Bx) ...
                case 'GetGlobal':
                case 'SetGlobal':
                    i.B = parseInt(ConstIdx[i.B]);
                break

                // Both RK(B) & RK(C)
                case 'SetTable':

                case 'Eq':
                case 'Lt':
                case 'Le':
                    
                case 'Add':
                case 'Sub':
                case 'Mul':
                case 'Div':
                case 'Mod':
                case 'Pow':
                    if (i.B >= 256)
                        i.B = parseInt(ConstIdx[i.B - 256]) + 256// fuck you javascript
                    
                // Only RK(C)
                case 'GetTable':
                case 'Self':
                    if (i.C >= 256)
                        i.C = parseInt(ConstIdx[i.C - 256]) + 256// fuck you javascript
                    break

                default: break;
            }
        }
    }



    function Constants(Chunk) {
        let Sizek = Chunk.Constants.length;


        for (let Idx = 0; Idx < Sizek; Idx++) {
            let con = Chunk.Constants[Idx];
            
        }
    }

    function Prototypes(Chunk) {
        let Sizep = Chunk.Prototypes.length;


        for (let Idx = 0; Idx < Sizep; Idx++) {
            ReadChunk(Chunk.Prototypes[Idx]);
        }
    }



    function ReadChunk(Chunk) {


        //console.table(Chunk.Instructions, ["Name", "Type", "Opcode", "A", "B", "C", "Line", "Data"]);

        Instructions(Chunk);
        Constants(Chunk);
        Prototypes(Chunk);
    }

    ReadChunk(LChunk);



    return LChunk;
}

