const {Opcode, Opname, Opmode, InstructionType, InstructionNumbers, ConstantType, ConstantNumbers, InstructionMap} = require('./Classes/Enums.js');
const {Instruction, Constant, Chunk} = require('./Classes/Classes.js');
var {ShuffleArray} = require("../Library/ArrayFunctions.js");
var {AssignBits, WriteBits} = require("../Library/BitWritter.js");

ArrayWriter = (Size, n) => {
    switch (Size) {
        case "Byte":
            WriteByte(n);
        break;
        case "Int32":
            WriteInt32(n);
        break;
        case "Double":
            WriteDouble(n);
        break;
        case "String":
            WriteString(n);
        break;
    }
}





module.exports.Serialize = async(LChunk, Settings) => {// little endian 
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



    function WriteInstructions(Chunk) {
        let Sizecode = Chunk.Instructions.length;
        WriteInt32(Sizecode);


        for (let Idx = 0; Idx < Sizecode; Idx++) {
            let i = Chunk.Instructions[Idx];

        
            let NewInst  = 0;
            let NewInst2 = 0;

            let A = i.A;
            let B = i.B;
            let C = i.C;

            let Registers = Settings.Registers[i.Type];
            



            

            /*NewInst |= (Settings.Opcodes[Opname[i.Opcode]] << Registers.Opcode[0]);
            NewInst |= (A << Registers.A[0]);


            switch (i.Type) {
                case InstructionType.ABx:
                    NewInst |= (B << (Registers.B[0]));
                break; 
                case InstructionType.AsBx:
                    B += 131071;
                    NewInst |= (B << (Registers.B[0]));
                break;  
                case InstructionType.ABC:
                    NewInst |= (C << (Registers.C[0]));
                    NewInst |= (B << (Registers.B[0]));
                break;
            }*/
           

        
            //Constant references part II
            /* 
                --Kst Info--
                1 = "Nil"
                2 = "Boolean"
                3 = "Number"
                4 = "String"

                --Eqinfo--
                1= TEST and TESTSET 
                2= EQ, LT, LE
            */

            let EqInfo   = 0;
            let KstBInfo = 0;
            let KstCInfo = 0;
            

            let KstB = Chunk.ConstantReferences[Idx].B;
            let KstC = Chunk.ConstantReferences[Idx].C;


            if(KstB != undefined){
                KstBInfo = Settings.Chunk.Constant.CTypes[KstB.Type];
            }
            if(KstC != undefined){
                KstCInfo = Settings.Chunk.Constant.CTypes[KstC.Type];
            }


            if(i.Opcode == 26 || i.Opcode == 27) EqInfo = 1;
            if(i.Opcode >= 23 && i.Opcode <= 25) EqInfo = 2;

            i.TypeInfo = Settings.Chunk.Instruction.ITypes[i.Type];
            i.EqInfo = EqInfo;
            i.KstBInfo = KstBInfo;
            i.KstCInfo = KstCInfo;

            i.Opcode = Settings.Opcodes[Opname[i.Opcode]];
            NewInst = WriteBits(Settings.Registers.Inst1, i);

            switch (i.Type) {
                case InstructionType.ABx:
                    NewInst2 = WriteBits(Settings.Registers.Bx, i);;
                break; 
                case InstructionType.AsBx:
                    i.B += 2**30;
                    NewInst2 = WriteBits(Settings.Registers.sBx, i);;
                break;  
                case InstructionType.ABC:
                    NewInst2 = WriteBits(Settings.Registers.BC, i);
                break;
            }

            //console.log(NewInst2);


            WriteKstB = () => {
                if(KstB != undefined){
                    switch (KstB.Type) {
                        case ConstantType.Nil:
                            WriteByte(0);
                        break;    
                        case ConstantType.Boolean:
                            WriteByte(KstB.Data ? 1 : 0);
                        break;
                        case ConstantType.Number:
                            WriteDouble(KstB.Data);
                        break;
                        case ConstantType.String:
                            WriteString(KstB.Data);
                        break;
                    }
                }
            }
            WriteKstC = () => {
                if(KstC != undefined){
                    switch (KstC.Type) {
                        case ConstantType.Nil:
                            WriteByte(0);
                        break;  
                        case ConstantType.Boolean:
                            WriteByte(KstC.Data ? 1 : 0);
                        break;
                        case ConstantType.Number:
                            WriteDouble(KstC.Data);
                        break;
                        case ConstantType.String:
                            WriteString(KstC.Data);
                        break;
                    }    
                }
            }

            /*let Structure = {
                "NewInst":  NewInst,                   //4 bytes
                "Type":     Settings.Chunk.Instruction.ITypes[i.Type],//byte
                "KstBInfo": KstBInfo,                  //byte
                "KstCInfo": KstCInfo,                  //byte
                "EqInfo":   EqInfo,                    //byte
            }


            for (let Idx in Settings.Chunk.Instruction.LStruct) {
                let Struct = Settings.Chunk.Instruction.LStruct[Idx];

                for (let Idx2 in Struct.Data) ArrayWriter(Struct.Data[Idx2].Size, Structure[Struct.Data[Idx2].Name])
            }*/



            WriteInt32(NewInst);
            WriteInt32(NewInst2);
            WriteKstB();
            WriteKstC();
        }
    }



    function WriteConstants(Chunk) {
        let Sizek = Chunk.Constants.length;
        WriteInt32(Sizek);

        for (let Idx = 0; Idx < Sizek; Idx++) {
            let con = Chunk.Constants[Idx];

            switch (con.Type) {
                case ConstantType.Nil:
                    WriteByte(0);
                break;      
                case ConstantType.Boolean:
                    WriteByte(Settings.Chunk.Constant.CTypes.Boolean);
                    WriteByte(con.Data ? 1 : 0);
                break;
                case ConstantType.Number:
                    WriteByte(Settings.Chunk.Constant.CTypes.Number);
                    WriteDouble(con.Data);
                break;
                case ConstantType.String:
                    WriteByte(Settings.Chunk.Constant.CTypes.String);
                    WriteString(con.Data);
                break;
            }		
        }
    }

    function WritePrototypes(Chunk) {
        let Sizep = Chunk.Prototypes.length;
        WriteInt32(Sizep);

        for (let Idx = 0; Idx < Sizep; Idx++) {
            WriteChunk(Chunk.Prototypes[Idx]);
        }
    }



    function WriteChunk(Chunk) {
        for(let Idx in Settings.Chunk.Struct.ToIndex){
            if (Idx == 'Upvalues') WriteByte(Chunk.UpvalueCount);   //used in CLOSURE
            if (Idx == 'Args') WriteByte(Chunk.ParameterCount); //used for Vararg
        }

        


       // console.table(Chunk.Instructions, ["Name", "Type", "Opcode", "A", "B", "C", "Line", "Data"]);



        
        for(let Idx in Settings.Chunk.Struct.Positions) {
            switch (Settings.Chunk.Struct.Positions[Idx]) {
                case "Instructions":
                    WriteInstructions(Chunk);
                break;
                case "Constants":
                    WriteConstants(Chunk);
                break;
                case "Prototypes":
                    WritePrototypes(Chunk)
                break;
            }
        }







    }







   




    WriteChunk(LChunk);





   let copy = Buffer.alloc(Index);
   Bytes.copy(copy, 0, 0, Index);

   //console.dir(copy, {'maxArrayLength': null})

   console.log(copy);
   return copy;
}

