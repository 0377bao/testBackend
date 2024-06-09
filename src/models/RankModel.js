const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
    {
        nameUser: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        numberRank: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

const RankModel = mongoose.model('Rank', newsSchema);

module.exports = RankModel;
