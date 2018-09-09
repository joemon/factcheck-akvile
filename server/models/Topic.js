var mongoose = require ("mongoose");

var topicSchema = new mongoose.Schema({
	topic: String,
},
	{collection: 'topics'}
);

module.exports = mongoose.model('Topic', topicSchema);