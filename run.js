/* TODO
   
*/

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const Serializer = require("./Bytecode/Serializer.js");
const Deserializer = require("./Bytecode/Deserializer.js");
const MutateChunks = require("./Bytecode/MutateChunks.js");
const SettingsBulder = require("./Settings/Build.js");
const VMGenerator = require("./Vm/GenerateVM.js");
const Minifier = require("./Minifier/luamin.js");

const Input = "TestScript.txt";
//const Input = "IY.txt";


async function Obfuscate() {
    let { err, stdout, stderr } = await exec(`luac -o luac.out ` + Input);
    if(err) console.error("----<< error in script >>----\n\n", err);

    let bt = fs.readFileSync("luac.out", { flag: 'r' });
    fs.unlinkSync("luac.out");

    var Settings = await SettingsBulder.Build();

    let LChunk  = await Deserializer.Deserialize(bt, Settings);
    let MuLChunk  = await MutateChunks.Mutate(LChunk, Settings);

    let Bytes   = await Serializer.Serialize(MuLChunk, Settings);
    let VM      = await VMGenerator.Build(Settings);


    Bytes = Bytes.toJSON().data;

    let Bytecode = "";
    for(let Idx in Bytes) {
        Bytecode+="\\" + Bytes[Idx];
    }
    bt = bt.toJSON().data;

    let OldBytecode = "";
    for(let Idx in bt) {
        OldBytecode+="\\" + bt[Idx];
    }




    VM+=`\n\n\n\n\n\n\nrun("${Bytecode}")()`


    let MinifiedVM = `--[[
        Dandelion V1.
]]--`;
    
    MinifiedVM += Minifier.Minify(VM, {
        RenameVariables: true,
        RenameGlobals: false,
        SolveMath: false,
    })


    fs.writeFileSync("BT.txt", OldBytecode);
    fs.writeFileSync("VM.txt", MinifiedVM);
}


Obfuscate();
