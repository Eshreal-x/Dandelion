
module.exports.Opcode = (Settings) => {
    let LI = [
        `local Stk = Stack;
        Stk[Inst[${Settings.A}]]	= (Inst[${Settings.D}] or Stk[Inst[${Settings.B}]]) - (Inst[${Settings.E}] or Stk[Inst[${Settings.C}]]);`,
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
