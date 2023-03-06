
module.exports.Opcode = (Settings) => {
    let LI = [
        `Stack[Inst[${Settings.A}]]	= (Inst[${Settings.B}] ~= 0);

        if (Inst[${Settings.C}] ~= 0) then
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
