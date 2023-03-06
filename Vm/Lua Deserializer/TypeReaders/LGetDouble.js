
const LI = [
    `
	GetDouble = function()
		local Left = GetInt32();
		local Right = GetInt32();
		local IsNormal = 1;
		local Mantissa = (gBit(Right, 0, 19) * (2 ^ 32)) + Left;

		local Exponent = gBit(Right, 20, 30);
		local Sign = ((-1) ^ gBit(Right, 31));

		if (Exponent == 0) then
			if (Mantissa == 0) then
				return Sign * 0;
			else
				Exponent = 1;
				IsNormal = 0;
			end;
		elseif (Exponent == 2047) then
			if (Mantissa == 0) then
				return Sign * (1 / 0);
			else
				return Sign * (0 / 0);
			end;
		end;

		return math.ldexp(Sign, Exponent - 1023) * (IsNormal + (Mantissa / (2 ^ 52)));
	end;
    `,


    //``
]

module.exports.Build = () => {
    return LI[Math.floor(Math.random() * LI.length)];
}

