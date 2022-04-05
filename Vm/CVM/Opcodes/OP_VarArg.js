
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local B	= Inst[${Settings.B}];
        local Stk, Vars	= Stack, Vararg;

        Top = A - 1;

        for Idx = A, A + (B > 0 and B - 1 or Varargsz) do
            Stk[Idx]	= Vars[Idx - A];
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
