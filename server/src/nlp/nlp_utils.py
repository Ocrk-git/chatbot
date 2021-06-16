import nltk
from nltk.stem.porter import PorterStemmer
import numpy as np
# nltk.download('punkt')

stemmer = PorterStemmer()

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokens_generated, words):
    stemmed_sentence = [stem(token) for token in tokens_generated]
    bag = np.zeros(len(words), dtype=np.float32)
    
    for index, word in enumerate(words):
        if word in stemmed_sentence:
            bag[index] = 1.0
            
    return bag