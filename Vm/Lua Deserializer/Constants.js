


module.exports.Build = (Settings) => {
    let LI = [
        `
            if (Type == ${Settings.Chunk.Constant.CTypes.Boolean}) then
                Cons	= (GetByte() ~= 0);
            elseif (Type == ${Settings.Chunk.Constant.CTypes.Number}) then 
                Cons	= GetDouble();
            elseif (Type == ${Settings.Chunk.Constant.CTypes.String}) then
                Cons	= Sub(GetString(), 1, -2);
            end;
        `,
    
    
        //``
    ]



    return LI[Math.floor(Math.random() * LI.length)];
}

