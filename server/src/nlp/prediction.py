import random
import json
import torch
import nltk
import numpy as np
import sys
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
from cnn_model import NeuralNet
from nlp_utils import tokenize, stem, bag_of_words
from prediction_helper import prediction
from flask import Flask, request
import json
import os
from pathlib import Path

app = Flask(__name__)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
root = os.getcwd()
file_path = Path(root)
# print(file_path.parent.parent)
FILE = os.path.join(file_path.parent.parent, "config.pth")
config = torch.load(FILE)

input_size = config["input_size"]
hidden_size = config["hidden_size"]
output_size = config["output_size"]
all_words = config["all_words"]
slugs = config["slugs"]
model_state = config["model_state"]

model = NeuralNet(input_size, hidden_size, output_size)
model.load_state_dict(model_state)
model.eval()

# Get prediction from model
# utterance = sys.argv[1]
# utterance = tokenize(utterance)
# X = bag_of_words(utterance, all_words)
# X = X.reshape(1, X.shape[0])
# X = torch.from_numpy(X)

# output = model(X)
# _, predicted = torch.max(output, dim=1)

# probabilities = torch.softmax(output, dim=1)
# confidence = probabilities[0][predicted.item()]

# intent = slugs[predicted.item()]
# final_prediction = {
#     "intent": intent,
#     "confidence": confidence.item(),
#     "entities": prediction(str(utterance)),
# }

# final_prediction = json.dumps(final_prediction, indent=4)


# print(final_prediction)


@app.route('/predict', methods=["GET"])
def predict():
    utterance = request.args.get('utterance')
    print(utterance)
    # return utterance
    # if utterance is None:
    #     return json.dumps({"error": "An utterance is required to get prediction"})
    # else:
    utterance = tokenize(utterance)
    X = bag_of_words(utterance, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    probabilities = torch.softmax(output, dim=1)
    confidence = probabilities[0][predicted.item()]

    intent = slugs[predicted.item()]
    final_prediction = {
        "intent": intent,
        "confidence": confidence.item(),
        "entities": prediction(str(utterance)),
    }

    final_prediction = json.dumps(final_prediction, indent=4)
    return final_prediction


if __name__ == '__main__':
    app.run(debug=True, port=8000)