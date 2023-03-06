
module.exports.Opcode = (Settings) => {
    let LI = [
        `local A = Inst[${Settings.A}];
        local B	= Inst[${Settings.B}];
        local C	= Inst[${Settings.C}];
        local Stk	= Stack;
        local Args, Results;
        local Limit, Edx;

        Args	= {};

        if (B ~= 1) then
            if (B ~= 0) then
                Limit = A + B - 1;
            else
                Limit = Top;
            end;

            Edx	= 0;

            for Idx = A + 1, Limit do
                Edx = Edx + 1;

                Args[Edx] = Stk[Idx];
            end;

            Limit, Results = _Returns(Stk[A](unpack(Args, 1, Limit - A)));
        else
            Limit, Results = _Returns(Stk[A]());
        end;

        Top = A - 1;

        if (C ~= 1) then
            if (C ~= 0) then
                Limit = A + C - 2;
            else
                Limit = Limit + A - 1;
            end;

            Edx	= 0;

            for Idx = A, Limit do
                Edx = Edx + 1;

                Stk[Idx] = Results[Edx];
            end;
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
