
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local Stk	= Stack;

        
        Stk[A] = assert(tonumber(Stk[A]), 'for initial value must be a number');
        Stk[A + 1] = assert(tonumber(Stk[A + 1]), 'for limit must be a number');
        Stk[A + 2] = assert(tonumber(Stk[A + 2]), 'for step must be a number');

        Stk[A]	= Stk[A] - Stk[A + 2];

        InstrPoint	= InstrPoint + Inst[${Settings.B}];`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
