import { buffer } from "stream/consumers";

interface dateProps{
    width:number;
    height:number;
    date:Date;
    buffer:boolean;
}

export default function DateItem({width,height,date,buffer}:dateProps)
{
    var widthString = width.toFixed(0) + "%";
    var heightString = height.toFixed(0) + "%";
    var day = getDayName(date.getDay());
    var suffix = getDateEnd(date.getDate());
    const styleSize = {minWidth:widthString, minHeight:heightString};
    if(buffer==true)
    {
        return(<div className="ItemBoxBuffer" style={styleSize}>
            <h1 className="CalDate">{day} {date.getDate()}{suffix} </h1>
        </div>);
    }
    return(<div className="ItemBox" style={styleSize}>
        <h1 className="CalDate">{day} {date.getDate()}{suffix} </h1>
    </div>);
}

//Convert the day value into the  shortened name
function getDayName(day:number)
{
    switch(day)
    {
        case 0:
            return "Sat";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Wed";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
}

//Get the suffix for the date (i.e. st, nd, rd, th)
function getDateEnd(date:number)
{
    //Default values between 10 and 20. 11th not 11st
    if(date > 10 && date < 20)
    {
        return "th";
    }
    switch(date%10)
    {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }

}