var {Opcode, InstructionType, ConstantType, InstructionMap} = require('./Classes/Enums.js');
var {Instruction, Constant, Chunk} = require('./Classes/Classes.js');





module.exports.Serialize = async(LChunks) => {// little endian 
    let Index = 0;
    let Bytes = Buffer.alloc(2**31-1);// 2**31-1

    Write = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            Bytes.writeInt8(arr[i], Index);
            Index++;
        }
    }

    WriteByte = (i) => {
        Bytes.writeInt8(i,Index);
        Index++
    }

    WriteInt32 = (i) => {
        Bytes.writeInt32LE(i, Index)
        Index+=4;
    }

    WriteDouble = (i) => {
        Bytes.writeDoubleLE(i, Index);
        Index+=8;
    }

    WriteString = (s) => {
        let len = Buffer.byteLength(s)+1;
        
        WriteInt32(len);
        Bytes.write(s, Index);
       // WriteByte(0);
        Index+=len;
    }





    function WriteChunk(c) {
        if (c.Name != "")
			WriteString(c.Name);
		else
            WriteInt32(0);

        WriteInt32(c.Line);
        WriteInt32(c.LastLine);
        WriteByte(c.UpvalueCount);
        WriteByte(c.ParameterCount);
        WriteByte(c.VarargFlag);
        WriteByte(c.StackSize);
        



        let Sizecode = c.Instructions.length;

        WriteInt32(Sizecode);
        for (let Idx = 0; Idx < Sizecode; Idx++) {
            let i = c.Instructions[Idx];

            let NewInst = 0;

            let A = i.A;
            let B = i.B;
            let C = i.C;

            NewInst |= i.Opcode;
            NewInst |= (A << 6);


            switch (i.Type) {
                case InstructionType.ABx:
                    NewInst |= (B << (6 + 8));
                break; 
                case InstructionType.AsBx:
                    B += 131071;
                    NewInst |= (B << (6 + 8));
                break;  
                case InstructionType.ABC:
                    NewInst |= (C << (6 + 8));
                    NewInst |= (B << (6 + 8 + 9));
                break;
            }
            WriteInt32(NewInst);
        }





        let Sizek = c.Constants.length;
        WriteInt32(Sizek);

        for (let Idx = 0; Idx < Sizek; Idx++) {
            let con = c.Constants[Idx];
            switch (con.Type) {
                case ConstantType.Nil:
                    WriteByte(0);
                break;
                    
                case ConstantType.Boolean:
                    WriteByte(1);
                    WriteByte(con.Data ? 1 : 0);
                break;
                
                case ConstantType.Number:
                    WriteByte(3);
                    WriteDouble(con.Data);
                break;
                
                case ConstantType.String:
                    WriteByte(4);
                    WriteString(con.Data);
                break;
			}		
        }

        
        let Sizep = c.Prototypes.length;

        WriteInt32(Sizep);

        for (let Idx = 0; Idx < Sizep; Idx++) {
            WriteChunk(c.Prototypes[Idx]);
        }

        //debug
        WriteInt32(0);
        WriteInt32(0);
        WriteInt32(0);
    }



    WriteByte(27);
    Write([0x4C, 0x75, 0x61]);
    WriteByte(0x51);
    WriteByte(0);
    WriteByte(1);
    WriteByte(4);
    WriteByte(4);
    WriteByte(4);
    WriteByte(8);
    WriteByte(0);





    WriteChunk(LChunks);







   let copy = Buffer.alloc(Index);
   Bytes.copy(copy, 0, 0, Index);

   //console.dir(copy, {'maxArrayLength': null})


   return copy;//.toJSON().data
}

