
module.exports.Opcode = (Settings, Chunk, Opcodes) => {//Chunk == settings full list
    //console.log(Chunk.Chunk.Struct.ToIndex.Upvalues);

    let LI = [
        `local NewProto	= Proto[Inst[${Settings.B}]];
        local Stk	= Stack;

        local Indexes;
        local NewUvals;

        if (NewProto[${Chunk.Upvalues}] ~= 0) then
            Indexes		= {};
            NewUvals	= setmetatable({}, {
                    __index = function(_, Key)
                        local Val	= Indexes[Key];

                        return Val[1][Val[2]];
                    end,
                    __newindex = function(_, Key, Value)
                        local Val	= Indexes[Key];

                        Val[1][Val[2]]	= Value;
                    end;
                }
            );

            for Idx = 1, NewProto[${Chunk.Upvalues}] do
                local Mvm	= Instr[InstrPoint];

                if (Mvm[${Settings.Opcode}] == ${Opcodes.Move}) then
                    Indexes[Idx - 1] = {Stk, Mvm[${Settings.B}]};
                elseif (Mvm[${Settings.Opcode}] == ${Opcodes.GetUpval}) then
                    Indexes[Idx - 1] = {Upvalues, Mvm[${Settings.B}]};
                end;

                InstrPoint	= InstrPoint + 1;
            end;

            Lupvals[#Lupvals + 1]	= Indexes;
        end;

        Stk[Inst[${Settings.A}]] = Wrap(NewProto, Env, NewUvals);`
    ]



    return LI[Math.floor(Math.random() * LI.length)];//${Chunk.Opcodes.Move}
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
