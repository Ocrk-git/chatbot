const feedbackValidator = (userData) =>{
    return new Promise (async resolve => {
        if(userData){
            if(userData >4){
                resolve({
                    success : true,
                    message : "Thanks! we are glad you had a great expirence"
                })
            }
            else {
                resolve({
                    success : true,
                    message : "We are sorry we didn't live up to your expectations. Will definitley try to improve"
                })
            }
        }
        else {
            resolve({
                success : false,
                message : "user data not found"
            })
        }
    })
}

module.exports = feedbackValidator