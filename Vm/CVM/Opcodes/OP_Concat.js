
module.exports.Opcode = (Settings) => {
    let LI = [
        `local Stk	= Stack;
        local B		= Inst[${Settings.B}];
        local K 	= Stk[B];

        for Idx = B + 1, Inst[${Settings.C}] do
            K = K .. Stk[Idx];
        end;

        Stack[Inst[${Settings.A}]]	= K;`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
