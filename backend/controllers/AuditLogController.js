const AuditLog = require('../models/AuditLog'); // Import schématu
const logger = require('../logger'); // Import the logger


async function logAuditEvent(eventType, username, details = {}) {
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
}

module.exports = { logAuditEvent };
