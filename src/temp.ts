var item : any;

item = 23;
item.name = "revanth"

var item2 : unknown;
item2 = 23;
if(typeof item2 === "number" && item2 <= 34) console.log(89)

var color : string | number;
color = "red"
function wish(value : string | number){
    if(typeof value === "string"){}
    else if(typeof value === "number"){}
    else assertVal(value)
}

function assertVal(value:never) : never{
    throw new Error("error occured "+value)
}
wish(color);