from pymongo import MongoClient
import torch
import torch.nn as nn
import numpy as np
from torch.utils.data import DataLoader, Dataset
from cnn_model import  NeuralNet
from nlp_utils import stem, bag_of_words, tokenize

client = MongoClient()
db = client["ocrk-users"]
journeysCollection = db["journeys"]

intents = list(journeysCollection.find({}))
all_words = []
slugs = []
xy=[]
for intent in intents:
    slug = intent['journeySlug']
    slugs.append(slug)
    utterances = intent['utterances']
    for utterance in utterances:
        tokens = tokenize(utterance)
        all_words.extend(tokens)
        xy.append((tokens, slug))

ignore_punct = ["?", "'", ",", "!", ":", ";", "-"]
all_words = [stem(word) for word in all_words if word not in ignore_punct]
all_words = sorted(set(all_words))
slugs = sorted(set(slugs))

X_train = []
y_train = []

for (pattern, slug) in xy:
    bag = bag_of_words(pattern, all_words)
    X_train.append(bag)
    
    label = slugs.index(slug)
    y_train.append(label)

X_train = np.array(X_train)
y_train = np.array(y_train)


class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = y_train
        
    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]
    
    def __len__(self):
        return self.n_samples

# Hyperparameters
batch_size = 8
input_size = len(all_words)
hidden_size = 8
output_size = len(slugs)
learning_rate = 0.001
# num_epochs = 1000
epoch = 1
loss = 10

dataset = ChatDataset()
train_loader = DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True, num_workers=2)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = NeuralNet(input_size, hidden_size, output_size)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = learning_rate)

while loss > 0.0001:
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(device)
        
        # Forward      
        outputs = model(words)
        loss = criterion(outputs, labels)
        
        # Backward     
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
#     print(f'Epoch====>{epoch}, loss={loss.item():.4f}')
    epoch += 1
        
print(f'Final Loss ={loss.item():.4f}, number of epochs={epoch}')

# Save model configurations
config = {
    "model_state": model.state_dict(),
    "input_size": input_size,
    "output_size": output_size,
    "hidden_size": hidden_size,
    "all_words": all_words,
    "slugs": slugs
}

FILE = "config.pth"
torch.save(config, FILE)