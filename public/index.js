const socket = io()
var count = 0

//User Details from query string
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

console.log(username, room)

//Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $botMessageTemplate = document.querySelector('#bot-template').innerHTML
const $youtubeCardTemplate = document.querySelector('#youtube-template').innerHTML
const $carouselTemplate = document.querySelector('#carousel-template').innerHTML
const $quickReplyTemplate = document.querySelector("#qr-template").innerHTML

//Elements
const $messages = document.querySelector('#message-box')
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $carousel = document.querySelector('#carousel-template')
const $chatDiv = document.querySelector('#chat-div')

//autoscroll
const autoScroll = () => {
    $("#chat-div").scrollTop($("#chat-div")[0].scrollHeight);
}

//Messages
$("#message-form").submit(function (e) {
    e.preventDefault();

    // Hide quick replies
    let divsToHide = document.getElementsByClassName("option"); //divsToHide is an array
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.visibility = "hidden"; // or
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }

    const userMessage = e.target.elements.message.value
    try {
        if (localStorage["context"] == "[]") {
            console.log("Context in if",localStorage["context"])
            socket.emit('sendMessage', { userMessage }, (error) => {
                
                if (error) {
                    return console.log(error)
                }
                console.log('Message Delivered!')
            })
            let html = Mustache.render($messageTemplate, {
                message: userMessage
            })
            $messages.insertAdjacentHTML('beforeend', html)
            $messageFormInput.value = ''
            $messageFormInput.focus()
            localStorage.removeItem("context");
        }
        else {
            console.log("Context in else",localStorage["context"])
            const steps = JSON.parse(localStorage["context"])
            console.log("Steps from context",steps)
            console.log("Steps type",typeof steps)
            // Create user message
            let html = Mustache.render($messageTemplate, {
                message: userMessage
            })
            $messages.insertAdjacentHTML('beforeend', html)
            $messageFormInput.value = ''
            $messageFormInput.focus()

            let context = steps
            socket.emit('sendMessage', { userMessage, context }, (error) => {

                if (error) {
                    return console.log(error)
                }
                console.log('Message Delivered!')
            })

            // Send bot message
            // const botHtml = Mustache.render($botMessageTemplate, {
            //     message: steps[0]
            // })
            // $messages.insertAdjacentHTML('beforeend', botHtml)
            // $messageFormInput.value = ''

            // steps.shift()
            // console.log("Context creation")
            // localStorage['context'] = JSON.stringify(steps);
        }
    }
    catch (e) {
        console.log("Local storage not found", e)
        socket.emit('sendMessage', { userMessage }, (error) => {

            if (error) {
                return console.log(error)
            }
            console.log('Message Delivered!')
        })
        // Showing user message
        const html = Mustache.render($messageTemplate, {
            message: userMessage
        })
        $messages.insertAdjacentHTML('beforeend', html)
        $messageFormInput.value = ''
        $messageFormInput.focus()

        // Showing bot response

    }
    autoScroll()
});

//Sockets

//Rendering carousel of youtube videos
socket.on('videoIframes', (videoIframes) => {

    // let container = document.createElement('div')
    // container.className = "container"
    // let row = document.createElement('div')
    // row.className = "row"
    // let carousel = document.createElement('div')
    // carousel.className = "owl-carousel"
    // carousel.id = "owl-example"
    // container.appendChild(row)
    // row.appendChild(carousel)
    // $messages.appendChild(container)
    // const videoIframe = videoIframes[0]
    // const html = Mustache.render($youtubeCardTemplate,{
    //     videoIframe
    // })
    // $messages.insertAdjacentHTML('beforeend', html)
    // videoIframes = videoIframes.slice(0,5)
    // console.log("Video Iframes",videoIframes)
    // videoIframes.forEach(videoIframe => {
    //     html = Mustache.render($youtubeCardTemplate,{
    //         videoIframe
    //     })
    //     $messages.insertAdjacentHTML('beforeend', html)
    // });
    const html = Mustache.render($youtubeCardTemplate, {
        videoIframe: videoIframes[0]
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
    // document.querySelector('#sidebar').innerHTML = html
})

socket.on('message', (message) => {

    // Check if context is present
    console.log(typeof message == 'object', typeof message)
    try {
        message = JSON.parse(message)
        const html = Mustache.render($botMessageTemplate, {
            message: message[0]
        })
        $messages.insertAdjacentHTML('beforeend', html)
        $messageFormInput.value = ''
        message.shift()
        console.log("Message",message)
        localStorage['context'] = JSON.stringify(message);
    }
    catch (e) {
        const html = Mustache.render($botMessageTemplate, {
            message
        })
        $messages.insertAdjacentHTML('beforeend', html)
        $messageFormInput.value = ''
        if(localStorage["context"] != "[]"){
            let steps = localStorage["context"]
            steps = JSON.parse(steps)
            steps.shift()
            localStorage["context"] = JSON.stringify(steps)
        }
        else{
            localStorage.removeItem("context");
        }
    }
    autoScroll()
})

socket.on('welcome', (messages) => {
    let html = ''
    let message = messages.title
    html = Mustache.render($botMessageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
    messages.options.forEach(element => {
        let text = element.title
        count += 1
        html = Mustache.render($quickReplyTemplate, {
            count,
            text
        })
        $messages.insertAdjacentHTML('beforeend', html)
    });
    $messageFormInput.value = ''
    autoScroll()
})

// Owl-Carousel

$(document).ready(function () {

    $("#owl-example").owlCarousel({
        itemsDesktop: [1499, 1],
        itemsDesktopSmall: [1199, 1],
        itemsTablet: [899, 1],
        itemsMobile: [599, 1],
        navigation: true,
        navigationText: ['<span class="fa-stack"><i class="fa fa-circle fa-stack-1x"></i><i class="fa fa-chevron-circle-left fa-stack-1x fa-inverse"></i></span>', '<span class="fa-stack"><i class="fa fa-circle fa-stack-1x"></i><i class="fa fa-chevron-circle-right fa-stack-1x fa-inverse"></i></span>'],
    });

});


// Handle Quick Reply
// let button = document.querySelector('.option')

buttonClick = function (qrId) {
    console.log(qrId)
    let divsToHide = document.getElementsByClassName("option"); //divsToHide is an array
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.visibility = "hidden"; // or
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }
    const userMessage = document.getElementById(qrId).innerHTML
    console.log(userMessage)
    socket.emit('sendMessage', { userMessage }, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message Delivered!')
    })
    const html = Mustache.render($messageTemplate, {
        message: userMessage
    })
    $messages.insertAdjacentHTML('beforeend', html)
    $messageFormInput.value = ''
    $messageFormInput.focus()
    autoScroll()
}