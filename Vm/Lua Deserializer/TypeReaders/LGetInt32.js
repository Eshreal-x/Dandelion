
const LI = [
    `
	GetInt32 = function()
		local W, X, Y, Z	= Byte(ByteString, Pos, Pos + 3);

		Pos	= Pos + 4;

		return (Z * 16777216) + (Y * 65536) + (X * 256) + W;
	end;
    `,


    //``
]

module.exports.Build = () => {
    return LI[Math.floor(Math.random() * LI.length)];
}

