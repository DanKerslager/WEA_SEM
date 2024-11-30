const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  event_type: { type: String, required: true },
  event_timestamp: { type: Date, default: Date.now },
  username: { type: String, required: true },
  details: { type: Object } // Může být dynamické, přizpůsobeno potřebám události
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
