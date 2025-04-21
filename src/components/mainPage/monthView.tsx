import DateItem from "@/components/mainPage/dateItem";

/**
 * Displays every day within a month
 * May not be clear to show event details, so just show if there is any (and colour coded type)
 * Don't forget repeat events
 */
interface mvProps
{
    month:number;
    year:number;
}
export default function MonthView({month,year}:mvProps)
{
    const daysInMonth = getDaysInMonth(month,year); //Get number of days in the month
    const monthStart = getStartDay(month,year); //Get the first day of the month
    var items = [];

    for(var i = (2-monthStart); i <= daysInMonth; i++) //2-MonthStart aligns to monday
    {
        var tempDate = new Date(year,month,i);
        if(i<1)
        {
            //Buffer from previous month, displayed differently
            items.push(<DateItem width={100/7} height={100/5} date={tempDate} buffer={true}/>)
        }
        else
        {
            items.push(<DateItem width={100/7} height={100/5} date={tempDate} buffer={false}/>)
        }

    }
    return items;
}

function getDaysInMonth(month:number, year:number)
{
    return new Date(year, month+1, 0).getDate();
}

function getStartDay(month:number, year:number)
{
    return new Date(year,month,1).getDay();
}
