const client = require('../utils/context.js')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('../utils/messageObject')
const context = (senderId, app) => {
    return new Promise(resolve => {
        client.get(senderId, (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                result = JSON.parse(result)
                // const project_type = result['context'].find((step) => {
                //     if (step.stepName = 'ask-name') {
                //         return step.stepValue
                //     }
                // })
                let project_location, project_name
                if ((/sky|towers/gi).test(app.data.message)) {
                    project_name = "Bhavani Sky Towers"
                    // project_location = `https://www.google.com/maps/place/14%C2%B024'41.9%22N+79%C2%B058'27.1%22E`
                }
                else if ((/newtown|new town/gi).test(app.data.message)) {
                    project_name = "Bhavani New Town"
                    // project_location = `https://www.google.com/maps/place/14%C2%B024'41.9%22N+79%C2%B058'27.1%22E`
                }
                else {
                    project_name = "Bhavani Fortune Prime"
                    // project_location = `https://www.google.com/maps/place/14%C2%B024'41.9%22N+79%C2%B058'27.1%22E`
                }
                const title = `What would you like to explore in ${project_name}`
                const options = [
                    {
                        title: "Amenities",
                        text: "Amenities"
                    },
                    {
                        title: "Configurations",
                        text: "Configurations"
                    },
                    {
                        title: "Site visit",
                        text: `site visit ${project_name}`
                    },
                    {
                        title: "Location",
                        url: `https://www.google.com/maps/place/14%C2%B024'41.9%22N+79%C2%B058'27.1%22E`
                    },
                    {
                        title: "Video tour",
                        text: "video tour"
                    }
                ]
                // console.log("Quick Replies===========>", JSON.stringify({ title, options }))
                // resolve(userMsg)
                resolve([sendQuickReply({ title, options })])
            }
        })
    })
}

module.exports = context