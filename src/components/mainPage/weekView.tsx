import DateItem from "@/components/mainPage/dateItem";

/**
 * Displays selected week, along with any events
 * Need to pass in start date as a prop
 * Read from loaded DB, don't forget repeated events
 */
interface wvProps
{
    dayInWeek: Date
}
export default function WeekView({dayInWeek}:wvProps)
{
    var items = [];
    const year = dayInWeek.getFullYear();
    const month = dayInWeek.getMonth();
    for(var i = (1-dayInWeek.getDay()); i <= 7-dayInWeek.getDay(); i++) //1-weekStart aligns to monday
    {
        var tempDate = new Date(year,month,i+dayInWeek.getDate());
        items.push(<DateItem width={100/7} height={100} date={tempDate} buffer={false}/>)
    }
    return items;
}
