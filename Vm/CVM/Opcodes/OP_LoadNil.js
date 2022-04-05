
module.exports.Opcode = (Settings) => {
    let LI = [
        `local Stk	= Stack;

        for Idx = Inst[${Settings.A}], Inst[${Settings.B}] do
            Stk[Idx]	= nil;
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
