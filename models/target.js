const mongoose = require('mongoose')

const targetSchema = new mongoose.SchemaTypeOptions({
    portfolioId : String,
    ticker: String,
});

const Target = mongoose.model('Target', targetSchema);

module.exports = Target;