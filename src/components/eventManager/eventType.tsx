export type calEvent =
{
    eventID:number,
    calendarID:number,
    eventType:number,
    name:String,
    description:String,
    startTime:Date,
    duration:String, //Stored as Time in database. Split at comma and perform individual additions to generate end time
    repeatLength:number
}

export type Calendar =
{
    calendarID:number,
    permissions:number,
    name:String,
    visible:Boolean
}

export type Flex =
{
    flexID:number,
    timeToComplete:number,
    deadline:Date,
    name:String
}
export type Preferences =
{
    startPref:String,
    endPref:String,
    dayPref:number,
    lengthPref:number,
    breakPref:number,
    daySessions:number
}