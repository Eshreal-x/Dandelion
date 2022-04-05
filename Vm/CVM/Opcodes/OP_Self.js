
module.exports.Opcode = (Settings) => {
    let LI = [
        `local Stk	= Stack;
        local A		= Inst[${Settings.A}];
        local B		= Stk[Inst[${Settings.B}]];
        local C		= Inst[${Settings.E}] or Stk[Inst[${Settings.C}]];
        Stk[A + 1]	= B;
        Stk[A]		= B[C];`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
