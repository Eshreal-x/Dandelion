
module.exports.Opcode = (Settings) => {
    let LI = [
        `Upvalues[Inst[${Settings.B}]]	= Stack[Inst[${Settings.A}]];`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
