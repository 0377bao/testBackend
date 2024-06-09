const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');
const newsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: [String], required: true },
    },
    {
        timestamps: true,
    },
);

// newsSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;
