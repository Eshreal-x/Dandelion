const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('./Classes/Enums.js');
const {Instruction, Constant, Chunk} = require('./Classes/Classes.js');



module.exports.Deserialize = async(input, Settings) => {
    let Index = 0;
    let ReadSizeT, SizeInt;

     Read = (size, IsBigEndian = false) => {
        let b = Buffer.alloc(size);
        
        input.copy(b, 0, Index, Index + size);
        
        Index+=size;

        if (IsBigEndian) return b.toJSON().data.reverse();//might be a bug here, because it's not a buffer. Oh well.
        return b;
    }

    ReadByte = () => {
        Index++
        return input.readInt8(Index-1);
    }

    ReadInt32 = (IsBigEndian = false) => {
        Index+=4;
        return IsBigEndian ? input.readInt32BE(Index-4) : input.readInt32LE(Index-4);
    }

    ReadDouble = (IsBigEndian = false) => {
        Index+=8;
        return IsBigEndian ? input.readDoubleBE(Index-8) : input.readDoubleLE(Index-8);
    }

    ReadString = (c) => {
        c = c ? c : ReadInt32();
        if(c == 0) return "";
        let b = Read(c).toString();
        
        return b.substring(0,b.length-1);
    }






    function DecodeInstructions(c) {
        let li = [];
        let Sizecode = ReadInt32();
        
        for (let Idx = 0; Idx < Sizecode; Idx++) {
            let code = ReadInt32();
            let Opco = (code & 0x3F);
            let i = new Instruction(c, Opco);

            i.Data = code;
            i.A = (code >> 6) & 0xFF;
            
            switch (i.Type) {
                case InstructionType.ABC:
                    i.B = (code >> 6 + 8 + 9) & 0x1FF;
					i.C = (code >> 6 + 8) & 0x1FF;
                break;
                case InstructionType.ABx:
                    i.B = (code >> 6 + 8) & 0x3FFFF;
                break;
                case InstructionType.AsBx:
                    i.B = ((code >> 6 + 8) & 0x3FFFF) - 131071;
                break;
            }
            li.push(i);
        }
        return li;
    }





    function DecodeConstants() {
        let li = [];
        let Sizek = ReadInt32();

        for (let Idx = 0; Idx < Sizek; Idx++) {
            let Type = ReadByte();
            let Cons = new Constant;

            switch (Type) {
                case 0: 
                    Cons.Type = ConstantType.Nil; 
                    Cons.Data = null;
                break;
                case 1:
                    Cons.Type = ConstantType.Boolean;
                    Cons.Data = ReadByte() != 0;
                break;
                case 3:
                    Cons.Type = ConstantType.Number;
                    Cons.Data = ReadDouble();
                break; 
                case 4:
                    Cons.Type = ConstantType.String;
                    Cons.Data = ReadString();
                break;
            }


            li.push(Cons);
        }
        return li;
    }




    function DecodePrototypes() {
        let li = [];
        let Sizep = ReadInt32();
        
        for (let Idx = 0; Idx < Sizep; Idx++) {
            li.push(DecodeChunk());
        }

        return li;
    }
    

    


    function DecodeChunk() {
        let c = new Chunk({
            Name:            ReadString(),
            Line:            ReadInt32(),
            LastLine:        ReadInt32(),
            UpvalueCount:    ReadByte(),
            ParameterCount:  ReadByte(),
            VarargFlag:      ReadByte(),
            StackSize:       ReadByte(),
        });
        

        c.Instructions = DecodeInstructions(c);
        c.Constants = DecodeConstants();
        c.Prototypes = DecodePrototypes();


        for (let Idx = 0; Idx < c.Instructions.length; Idx++)//Constant Refs
            c.Instructions[Idx].SetupConstRefs(Idx);



            

        let count = ReadInt32();
        for (let i = 0; i < count; i++) // source line pos list
            c.Instructions[i].Line = ReadInt32();

        


        count = ReadInt32();
        for (let i = 0; i < count; i++) // local list
        {
            ReadString();
            ReadInt32();
            ReadInt32();
        }


        count = ReadInt32();
        for (let i = 0; i < count; i++) c.Upvalues.push(ReadString());// upvalues


    
        return c;
    }







    //console.dir(input, {'maxArrayLength': null})
    console.log(input);
    console.log(input.toJSON().data);

    //let header = ReadInt32()
    
    if (ReadInt32(true) != 0x1B4C7561) console.log("Invalid bytecode / luac file");
    if (ReadByte() != 0x51) console.log("Only Lua 5.1 is supported.");
    
    ReadByte() // Format version not supporting anything else (0 = default)
    ReadByte(); // bigEndian 0=big, 1=small default=1
    SizeInt = ReadByte() == 4 ? ReadInt32 : ReadDouble // SizeInt
    ReadSizeT   = ReadByte() == 4 ? ReadInt32 : ReadDouble // SizeT
    ReadByte() // 4
    ReadByte() // 8
    ReadByte() // 0


    return DecodeChunk();
}

