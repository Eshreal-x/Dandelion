
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local Cls	= {};

        for Idx = 1, #Lupvals do
            local List = Lupvals[Idx];

            for Idz = 0, #List do
                local Upv	= List[Idz];
                local Stk	= Upv[1];
                local Pos	= Upv[2];

                if (Stk == Stack) and (Pos >= A) then
                    Cls[Pos]	= Stk[Pos];
                    Upv[1]		= Cls;
                end;
            end;
        end;`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
