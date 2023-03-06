
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local B	= Inst[${Settings.B}];
        local C	= Inst[${Settings.C}];
        local Stk = Stack;

        if (C == 0) then
            InstrPoint	= InstrPoint + 1;
            C			= Instr[InstrPoint].Value;
        end;

        local Offset	= (C - 1) * 50;
        local T			= Stk[A]; -- Assuming T is the newly created table.

        if (B == 0) then
            B	= Top - A;
        end;

        for Idx = 1, B do
            T[Offset + Idx] = Stk[A + Idx];
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
