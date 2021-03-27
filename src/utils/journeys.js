journeys = {
    "raise-ticket": [
        {
            "stepName" : "ask-name",
            "prompt": [
                {
                    "type": "text",
                    "value": "Can you please tell me your name?"
                }
            ],
            "validator": null
        },
        {
            "stepName" : "ask-phone",
            "prompt": [
                {
                    "type": "text",
                    "value": "Please tell me your mobile number"
                }
            ],
            "validator": "phoneValidator"
        },
        {
            "stepName" : "ask-email",
            "prompt": [
                {
                    "type": "text",
                    "value": "Please tell me your email ID"
                }
            ],
            "validator": "emailValidator"
        },
        {
            "response": [
                {
                    "type": "text",
                    "value": "I have raised a ticket on your behalf, Thank you"
                },
                {
                    "type": "intent",
                    "value": "feedback"
                }
            ]
        }
    ],
    "feedback" : [
        {
            "stepName" : "ask-feedback",
            "prompt" : [
                {
                    "type" : "text",
                    "value" : "Please rate your experience with us on the scale od 1-10"
                }
            ],
            "validator" : null
        },
        {
            "response" : [
                {
                    "type" : "text",
                    "value" : "Thanks for your feedback, Have a good day😊."
                }
            ]
        }
    ]
}

module.exports = journeys