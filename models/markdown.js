const mongoose = require('mongoose');
const MarkdownSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: [true, 'Error - document name']
  },
  text: {
    type: String,
    required: [true, 'Error - document text']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Markdown', MarkdownSchema);
