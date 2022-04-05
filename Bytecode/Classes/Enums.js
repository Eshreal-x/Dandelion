const Opcode = {
    Move:       0,
    Loadk:      1,
    LoadBool:   2,
    LoadNil:    3,
    GetUpval:   4,
    GetGlobal:  5,
    GetTable:   6,
    SetGlobal:  7,
    SetUpval:   8,
    SetTable:   9,
    NewTable:   10,
    Self:       11,
    Add:        12,
    Sub:        13,
    Mul:        14,
    Div:        15,
    Mod:        16,
    Pow:        17,
    Unm:        18,
    Not:        19,
    Len:        20,
    Concat:     21,
    Jmp:        22,
    Eq:         23,
    Lt:         24,
    Le:         25,
    Test:       26,
    TestSet:    27,
    Call:       28,
    TailCall:   29,
    Return:     30,
    ForLoop:    31,
    ForPrep:    32,
    TForLoop:   33,
    SetList:    34,
    Close:      35,
    Closure:    36,
    VarArg:     37
}


const Opname = [
    "Move",
    "Loadk",
    "LoadBool",
    "LoadNil",
    "GetUpval",
    "GetGlobal",
    "GetTable",
    "SetGlobal",
    "SetUpval",
    "SetTable",
    "NewTable",
    "Self",
    "Add",
    "Sub",
    "Mul",
    "Div",
    "Mod",
    "Pow",
    "Unm",
    "Not",
    "Len",
    "Concat",
    "Jmp",
    "Eq",
    "Lt",
    "Le",
    "Test",
    "TestSet",
    "Call",
    "TailCall",
    "Return",
    "ForLoop",
    "ForPrep",
    "TForLoop",
    "SetList",
    "Close",
    "Closure",
    "VarArg"
]




const Opmode = [
    {"B": "OpArgR", "C": "OpArgN"},//0
    {"B": "OpArgK", "C": "OpArgN"},//1
    {"B": "OpArgU", "C": "OpArgU"},//2
    {"B": "OpArgR", "C": "OpArgN"},//3
    {"B": "OpArgU", "C": "OpArgN"},//4
    {"B": "OpArgK", "C": "OpArgN"},//5
    {"B": "OpArgR", "C": "OpArgK"},//6
    {"B": "OpArgK", "C": "OpArgN"},//7
    {"B": "OpArgU", "C": "OpArgN"},//8
    {"B": "OpArgK", "C": "OpArgK"},//9
    {"B": "OpArgU", "C": "OpArgU"},//10
    {"B": "OpArgR", "C": "OpArgK"},//11
    {"B": "OpArgK", "C": "OpArgK"},//12
    {"B": "OpArgK", "C": "OpArgK"},//13
    {"B": "OpArgK", "C": "OpArgK"},//14
    {"B": "OpArgK", "C": "OpArgK"},//15
    {"B": "OpArgK", "C": "OpArgK"},//16
    {"B": "OpArgK", "C": "OpArgK"},//17
    {"B": "OpArgR", "C": "OpArgN"},//18
    {"B": "OpArgR", "C": "OpArgN"},//19
    {"B": "OpArgR", "C": "OpArgN"},//20
    {"B": "OpArgR", "C": "OpArgR"},//21
    {"B": "OpArgR", "C": "OpArgN"},//22
    {"B": "OpArgK", "C": "OpArgK"},//23
    {"B": "OpArgK", "C": "OpArgK"},//24
    {"B": "OpArgK", "C": "OpArgK"},//25
    {"B": "OpArgR", "C": "OpArgU"},//26
    {"B": "OpArgR", "C": "OpArgU"},//27
    {"B": "OpArgU", "C": "OpArgU"},//28
    {"B": "OpArgU", "C": "OpArgU"},//29
    {"B": "OpArgU", "C": "OpArgN"},//30
    {"B": "OpArgR", "C": "OpArgN"},//31
    {"B": "OpArgR", "C": "OpArgN"},//32
    {"B": "OpArgN", "C": "OpArgU"},//33
    {"B": "OpArgU", "C": "OpArgU"},//34
    {"B": "OpArgN", "C": "OpArgN"},//35
    {"B": "OpArgU", "C": "OpArgN"},//36
    {"B": "OpArgU", "C": "OpArgN"}//37
]




const InstructionType = {
    ABC:    "ABC",
    ABx:    "ABx",
    AsBx:   "AsBx"
}

const InstructionNumbers = {
    ABC:    0,
    ABx:    1,
    AsBx:   2
}

const ConstantType = {
    Nil:     "Nil",
    Boolean: "Boolean",
    Number:  "Number",
    String:  "String"
}

const ConstantNumbers = {
    Nil:        0,
    Boolean:    1,
    Number:     2,
    String:     3
}

const InstructionMap = {
    [Opcode.Move]: InstructionType.ABC,
    [Opcode.Loadk]: InstructionType.ABx,
    [Opcode.LoadBool]: InstructionType.ABC,
    [Opcode.LoadNil]: InstructionType.ABC,
    [Opcode.GetUpval]: InstructionType.ABC,
    [Opcode.GetGlobal]: InstructionType.ABx,
    [Opcode.GetTable]: InstructionType.ABC,
    [Opcode.SetGlobal]: InstructionType.ABx,
    [Opcode.SetUpval]: InstructionType.ABC,
    [Opcode.SetTable]: InstructionType.ABC,
    [Opcode.NewTable]: InstructionType.ABC,
    [Opcode.Self]: InstructionType.ABC,
    [Opcode.Add]: InstructionType.ABC,
    [Opcode.Sub]: InstructionType.ABC,
    [Opcode.Mul]: InstructionType.ABC,
    [Opcode.Div]: InstructionType.ABC,
    [Opcode.Mod]: InstructionType.ABC,
    [Opcode.Pow]: InstructionType.ABC,
    [Opcode.Unm]: InstructionType.ABC,
    [Opcode.Not]: InstructionType.ABC,
    [Opcode.Len]: InstructionType.ABC,
    [Opcode.Concat]: InstructionType.ABC,
    [Opcode.Jmp]:  InstructionType.AsBx,
    [Opcode.Eq]: InstructionType.ABC,
    [Opcode.Lt]: InstructionType.ABC,
    [Opcode.Le]: InstructionType.ABC,
    [Opcode.Test]: InstructionType.ABC,
    [Opcode.TestSet]: InstructionType.ABC,
    [Opcode.Call]: InstructionType.ABC,
    [Opcode.TailCall]: InstructionType.ABC,
    [Opcode.Return]: InstructionType.ABC,
    [Opcode.ForLoop]: InstructionType.AsBx,
    [Opcode.ForPrep]: InstructionType.AsBx,
    [Opcode.TForLoop]: InstructionType.ABC,
    [Opcode.SetList]: InstructionType.ABC,
    [Opcode.Close]: InstructionType.ABC,
    [Opcode.Closure]: InstructionType.ABx,
    [Opcode.VarArg]: InstructionType.ABC
};

module.exports.Opcode               = Opcode;
module.exports.Opname               = Opname;
module.exports.Opmode               = Opmode;
module.exports.InstructionType      = InstructionType;
module.exports.InstructionNumbers   = InstructionNumbers;
module.exports.ConstantType         = ConstantType;
module.exports.ConstantNumbers      = ConstantNumbers;
module.exports.InstructionMap       = InstructionMap;


