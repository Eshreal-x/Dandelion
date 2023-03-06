
module.exports.Opcode = (Settings) => {
    let LI = [
        `local B = Stack[Inst[${Settings.B}]];

        if Inst[${Settings.C}] then 
            if B then
                InstrPoint = InstrPoint + 1;
            else 
                Stack[Inst[${Settings.A}]] = B
            end
        elseif B then
            Stack[Inst[${Settings.A}]] = B
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
