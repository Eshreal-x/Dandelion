
const LI = [
    `
    GetByte = function()
        local F	= Byte(ByteString, Pos, Pos);

        Pos	= Pos + 1;

        return F;
    end;
    `,


    //``
]

module.exports.Build = () => {
    return LI[Math.floor(Math.random() * LI.length)];
}

