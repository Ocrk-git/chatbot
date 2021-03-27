const emailValidator = (userData) => {
    return new Promise(resolve => {
        if (userData) {
            const emailRegex = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gmi
            if (phoneRegex.test(userData)) {
                let userEmail = emailRegex.exec(userData)
                resolve({
                    success: true,
                    message: userEmail[0]
                })
            }
            else {
                resolve({
                    success: false,
                    message: "Please provide valid mobile number"
                })
            }
        }
        else {
            resolve({
                success: false,
                message: "User input not found"
            })
        }
    })
}

module.exports = emailValidator