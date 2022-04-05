
module.exports.Opcode = (Settings) => {
    let LI = [
        `local Stk = Stack;
        local B = Inst[${Settings.D}] or Stk[Inst[${Settings.B}]];
        local C = Inst[${Settings.E}] or Stk[Inst[${Settings.C}]];
        
        if (B == C) ~= Inst[${Settings.A}] then
            InstrPoint	= InstrPoint + 1;
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
