import pickle
import sys
import inspect
import os
import pandas as pd



message = sys.argv[1]
path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
datasetPath = path + '/edited Smalltalk repo extra - Sheet1.csv'
df = pd.read_csv(datasetPath)

# responses = {
#     "who": "My name is Edith and I am a virtual assistant designed to answer queries",
#     "created": "I was developed by Mr. Nanda Vikas. He's working as a software engineer at Yellow Messenger",
#     "services": "I am trained to assist you with your queries",
#     "age": "Well, I don't have any age, but technically I am 0 days old",
#     "good-morning": "Hey there! Good morning",
#     "good-afternoon": "Hey there! Good afternoon",
#     "good-evening": "Hey there! Good evening",
#     "gender": "Since I am a bot I won't have any gender. But according to my name, you can consider me a male chatbot 🤪"
# }

modelPath = path + "/small_talk_model"

model = pickle.load(open(modelPath,'rb'))
intents = model.predict([message])
response = list(df['Answer'][df['label']==intents[0]])[0]
# print(responses[intents[0]])
print(response)
sys.stdout.flush()