import pickle
import joblib
import sys
import inspect
import os
import pandas as pd
import json
from os.path import dirname, abspath


message = sys.argv[1]

path = dirname(dirname(abspath(__file__)))
model_path = path + '/ensemble_model'
config_path = path + '/modelConfig.json'
model = pickle.load(open(model_path,'rb'))

with open(config_path) as f:
  data = json.load(f)
  condition = data['vectorizer'] + "-" + data['classifier']

if condition == "CountVectorizer-DecisionTreeClassifier":
    from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
    vectorizer = CountVectorizer()
    test_data = vectorizer.transform([message])
    intents = model.predict([test_data])
# response = list(df['Answer'][df['label']==intents[0]])[0]
    print(intents)
# sys.stdout.flush()