var mongoose = require ("mongoose");

var factSchema = new mongoose.Schema({
	fact: String, 
	topicID: String, 
	tags: [{
		type:String
	}],
	supporting: [{
		type:String
	}],
	conflicting: [{
		type:String
	}],
	created: {
		type: Date, 
		required: true,
		default: new Date()
	}
});


module.exports = mongoose.model('Fact', factSchema);

