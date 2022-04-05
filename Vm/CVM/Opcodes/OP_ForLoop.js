
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local Stk	= Stack;

        local Step	= Stk[A + 2];
        local Index	= Stk[A] + Step;

        Stk[A]	= Index;

        if (Step > 0) then
            if Index <= Stk[A + 1] then
                InstrPoint	= InstrPoint + Inst[${Settings.B}];

                Stk[A + 3] = Index;
            end;
        else
            if Index >= Stk[A + 1] then
                InstrPoint	= InstrPoint + Inst[${Settings.B}];

                Stk[A + 3] = Index;
            end
        end`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
