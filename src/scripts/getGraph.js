/**
 * Call the graph API to get the calendar
 * Need to determine any changes since last check, and update DB accordingly
 * Potential idea- just read this instead of from DB, circumventing SQL requirement
 * Read vid Graph, update based on event creation/deletion. May automatically handle event based permissions and security
 * Though makes Outlook Calendar required instead of optional
 * 
 * If not connected, use as normal
 * If connected, Naively merge events and use Outlook as new base, storing in SQL DB as required, so not lost on disconnect
 * Contingency if Outlook not available, store list of changes and attempt to replicate
 */