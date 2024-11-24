const AuditLog = require('../models/AuditLog'); // Import schema
const logger = require('../logger'); // Import the logger

// Arrow function for logging audit events
const logAuditEvent = async (eventType, username, details = {}) => {
  try {
    const auditEvent = new AuditLog({
      event_type: eventType,
      username: username,
      details: details
    });
    await auditEvent.save();
    logger.log('Audit log saved successfully');
  } catch (error) {
    logger.error('Error saving audit log:', error);
  }
};

// Arrow function for logging book diff events
const logBookDiff = async (beforeSet, afterSet) => {
  // Books that are shown (in afterSet but not in beforeSet)
  for (const [bookId, title] of afterSet.entries()) {
    if (!beforeSet.has(bookId)) {
      await logAuditEvent('BOOK_SHOWN', 'CDB', { bookId, title });
    }
  }

  // Books that are hidden (in beforeSet but not in afterSet)
  for (const [bookId, title] of beforeSet.entries()) {
    if (!afterSet.has(bookId)) {
      await logAuditEvent('BOOK_HIDDEN', 'CDB', { bookId, title });
    }
  }
};

module.exports = { logAuditEvent, logBookDiff };
