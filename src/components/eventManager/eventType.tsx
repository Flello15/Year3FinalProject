export type calEvent =
{
    eventID:number,
    calendarID:number,
    eventType:number,
    name:string,
    description:string,
    startTime:Date,
    duration:string, //Stored as Time in database. Split at colon and perform individual additions to generate end time
    repeatLength:number
}

export type Calendar =
{
    calendarID:number,
    permissions:number,
    name:string,
    visible:Boolean
}

export type Flex =
{
    flexID:number,
    timeToComplete:number,
    deadline:Date,
    name:string
}
export type Preferences =
{
    startPref:string,
    endPref:string,
    dayPref:number,
    lengthPref:string,
    breakPref:string,
    daySessions:number
}