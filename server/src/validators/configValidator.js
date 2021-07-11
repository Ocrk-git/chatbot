const configValidator = (userData) => {
    return new Promise(resolve => {
        if (userData) {
            if ((/master plan|master/gi).test(userData)) {
                resolve({
                    success: true,
                    message: "master plan"
                })
            }
            else if((/bedroom|block-a|bedroom plan|block-a plan/gi).test(userData)){
                resolve({
                    success: true,
                    message: "Block - A Bed room plan"
                })
            }
            else if((/all|all configurations|/gi).test(userData)){
                resolve({
                    success: true,
                    message: "all"
                })
            }
            else {
                resolve({
                    success: false,
                    message: "Not desired user input"
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

module.exports = configValidator