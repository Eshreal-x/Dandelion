
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local B	= Inst[${Settings.B}];
        local Stk	= Stack;
        local Edx, Output;
        local Limit;

        if (B == 1) then
            return;
        elseif (B == 0) then
            Limit	= Top;
        else
            Limit	= A + B - 2;
        end;

        Output = {};
        Edx = 0;

        for Idx = A, Limit do
            Edx	= Edx + 1;

            Output[Edx] = Stk[Idx];
        end;

        return Output, Edx;`
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}
module.exports.SuperOpcode = (Instr, Settings) => {
    let LI = [
        ""
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}  
