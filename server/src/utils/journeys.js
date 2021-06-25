const Journey = require('../db/dbModels/journeyModel')

const getJourneyFlow = async (journeySlug) => {
    let context = await Journey.findOne({ journeySlug })
    return context.flow
}

module.exports = getJourneyFlow