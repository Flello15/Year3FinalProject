export type calEvent =
{
    eventID: Number,
    calendarID: Number,
    eventType:Number,
    name:String,
    description:String,
    startTime:Date,
    duration:String, //Stored as Time in database. Split at comma and perform individual additions to generate end time
    repeatLength:Number
}

export type Calendar =
{
    calendarID:Number,
    permissions:Number,
    name:String,
    visible:Boolean
}
