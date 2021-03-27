import pickle
import sys
import inspect
import os
import pandas as pd



message = sys.argv[1]
path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
datasetPath = path + '/faq_bot_training.csv'
df = pd.read_csv(datasetPath)

modelPath = path + "/small_talk_model"

model = pickle.load(open(modelPath,'rb'))
intents = model.predict([message])
response = list(df['Answer'][df['label']==intents[0]])[0]
print(response)
sys.stdout.flush()