
const LI = [
    `
	GetString = function(Len)
		local Str;

		if Len then
			Str	= Sub(ByteString, Pos, Pos + Len - 1);

			Pos = Pos + Len;
		else
			Len = GetInt32();

			if (Len == 0) then return; end;

			Str	= Sub(ByteString, Pos, Pos + Len - 1);

			Pos = Pos + Len;
		end;

		return Str;
	end;
    `,


    //``
]

module.exports.Build = () => {
    return LI[Math.floor(Math.random() * LI.length)];
}

