import pandas as pd
import numpy as np

df = pd.read_csv('edited Smalltalk repo extra - Sheet1.csv')

from sklearn.model_selection import train_test_split

X = df['Question']

y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42, test_size=0.1)

from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline

svc_clf = Pipeline([('tfidf',TfidfVectorizer()), ('clf',LinearSVC())])

svc_clf.fit(X,y)

import pickle

fileName = 'small_talk_model'
pickle.dump(svc_clf, open(fileName, 'wb'))