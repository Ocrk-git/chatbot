var request = require('request');

const asyncForLoop = async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const generateYoutubeVideos = (searchQuery) => {
    return new Promise(resolve=>{
        let videos = []
        let options = {
            'method': 'GET',
            'url': `https://www.youtube.com/results?search_query=${searchQuery}`,
        };
        request(options, async function (error, response) {
            if (error) throw new Error(error);
            const body = await response.body
            const watchRegex = /watch\?v=(\S{11})/gm;
            const videoIds = body.match(watchRegex)
            const embedUrl = "https://www.youtube.com/embed/"
            videoIds.forEach(videoId => {
                console.log(`https://www.youtube.com/${videoId}`)
                videos.push(embedUrl + videoId.split("=")[1])
            });
            // console.log("videos in youtube search",videos);
            resolve(videos)
        });
    })
}

module.exports = {
    generateYoutubeVideos
};