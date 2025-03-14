/**
 * Adding event
 * Call the SQL API to add an event by the user based on given parameters
 * 
 * Removing event
 * Call the SQL API to find and remove the selected event
 * Since event read from DB, should be able to just find by ID
 * Check event creator, in case of collaborative event
 * If flexible evnet, call function to adjust schedule, given timeslot lost (cannot repeat same time)
 * 
 * Moving event- Add new delete old
 * 
 * Permissions- verify user has required calendar permissions
 * Should be able to include both as separate functions
 * May need calls to Graph API to update Outlook calendar -Outlook not currently viable
 */