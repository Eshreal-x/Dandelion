const Shuffle = true;



ShuffleArray = (Arr) => {
    if(!Shuffle) return Arr;
    let Idx = Arr.length,  RIdx;

    while (0 !== Idx) {
        RIdx = Math.floor(Math.random() * Idx);
        Idx--;

        [Arr[Idx], Arr[RIdx]] = [Arr[RIdx], Arr[Idx]];
    }

    return Arr;
}

ListToArray = (li, Path, Int = 0, Shuffle = true) => {
    if(Shuffle) li = ShuffleArray(li);
    for(let Idx in li) Path[li[Idx].Name] = parseInt(Idx)+Int;
}

module.exports.ShuffleArray = ShuffleArray;
module.exports.ListToArray  = ListToArray;