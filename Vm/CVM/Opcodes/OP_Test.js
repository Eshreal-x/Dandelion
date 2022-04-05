
module.exports.Opcode = (Settings) => {
    let LI = [
        `if Inst[${Settings.C}] then 
        if Stack[Inst[${Settings.A}]] then
          InstrPoint = InstrPoint + 1;
        end
      elseif Stack[Inst[${Settings.A}]] then
      else 
        InstrPoint = InstrPoint + 1;
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
