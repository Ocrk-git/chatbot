const phoneValidator = (userData) => {
    return new Promise((resolve,reject) => {
        if (userData) {
            const phoneRegex = /^(\+\d{1,3}[-]?)?(0)?(91)?([6-9]{1}[0-9]{9})$/gmi
            if (phoneRegex.test(userData)) {
                let userMobile = userData.match(phoneRegex)
                console.log("User mobile number from validator",userMobile)
                resolve({
                    success: true,
                    message: userMobile[0]
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

module.exports = phoneValidator