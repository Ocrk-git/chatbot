from pymongo import MongoClient

client = MongoClient()
db = client["ocrk-users"]
journeysCollection = db["journeys"]

import pandas as pd
import numpy as np

df = pd.DataFrame()

journeys = journeysCollection.find({})
intents = []
utterances = []

for journey in journeys:
    if len(journey["utterances"]) is not 0:
        for utterance in journey["utterances"]:
            intents.append(journey["journeySlug"])
            utterances.append(utterance)
            
df["intents"] = intents
df["utterances"] = utterances

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

def train(vectorizer, classifier):
    X = vectorizer.fit_transform(df["utterances"]).toarray()
    
    #Intents
    y = df['intents']
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0, test_size=0.9)

    classifier.fit(X,y)
    y_pred_DT = classifier.predict(X_test)
    return (accuracy_score(y_test, y_pred_DT), classifier)

def Sort_List(tup): 
    tup.sort(key = lambda x: x[2], reverse=True) 
    return tup 

permutations = [(CountVectorizer(),DecisionTreeClassifier()), 
                (TfidfVectorizer(),DecisionTreeClassifier()), 
                (CountVectorizer(),RandomForestClassifier()),
                (TfidfVectorizer(),RandomForestClassifier())]

for index in range(len(permutations)):
    permutation = permutations[index]
    (confidence, model) = train(*permutation)
    (vectorizer, classifier) = permutation
    permutations[index] = (vectorizer, classifier, confidence, model)

permutations = Sort_List(permutations)
model_config = {
    "vectorizer": str(permutations[0][0]).split("(")[0],
    "classifier": str(permutations[0][1]).split("(")[0],
    "accuracy": permutations[0][2]
}

import pickle

model = permutations[0][3]
fileName = 'ensemble_model'
pickle.dump(model, open(fileName, 'wb'))

import json
import sys

with open('modelConfig.json', 'w') as fp:
    json.dump(model_config, fp)

print("Success")
sys.stdout.flush()