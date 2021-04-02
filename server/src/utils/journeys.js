journeys = {
    "raise-ticket": [
        {
            "stepName" : "ask-name",
            "prompt": [
                {
                    "type": "text",
                    "value": "Sure I can help you with that🙂"
                },
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
                    "type": "function",
                    "value": "mobilePrompt"
                },
                {
                    "type": "text",
                    "value": "This helps us to get to know about your ticket.😀"
                }
            ],
            "validator": "phoneValidator"
        },
        {
            "stepName" : "ask-age",
            "prompt": [
                {
                    "type": "text",
                    "value": "Please provide us your age"
                }
            ],
            "validator": null
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
                    "value" : "Please rate your experience with us on the scale of 1-10"
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