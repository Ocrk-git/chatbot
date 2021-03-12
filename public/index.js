const socket = io()

//User Details from query string
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

console.log(username, room)

//Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $botMessageTemplate = document.querySelector('#bot-template').innerHTML
const $youtubeCardTemplate = document.querySelector('#youtube-template').innerHTML
const $carouselTemplate = document.querySelector('#carousel-template').innerHTML

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
    const userMessage = e.target.elements.message.value
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

    // const botHtml = Mustache.render($botMessageTemplate, {
    //     message: "Hello! I am Edith, your virtual assistant. How can I help you?"
    // })
    // $messages.insertAdjacentHTML('beforeend', botHtml)
    autoScroll()
});

//Sockets

//Rendering carousel of youtube videos
socket.on('videoIframes',(videoIframes)=>{
    
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
    const html = Mustache.render($youtubeCardTemplate,{
        videoIframe: videoIframes[0]
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
    // document.querySelector('#sidebar').innerHTML = html
})

socket.on('message',(message)=>{
    const html = Mustache.render($botMessageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
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