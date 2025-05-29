import json
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

import numpy as np
from utils.nlp_utils import get_sentence_embedding
from model.model import BERTClassifier

# завантаження даних
with open("data/intents.json", "r", encoding="utf-8") as f:
    intents = json.load(f)

tags = []
xy = []

# збір пар (речення, тег)
for intent in intents["intents"]:
    tag = intent["tag"]
    tags.append(tag)
    for pattern in intent["patterns"]:
        xy.append((pattern, tag))

tags = sorted(set(tags))

# генерація ембеддінгів BERT
X_train = []
y_train = []

print("Генерація ембеддінгів для BERT...")
for (pattern_sentence, tag) in xy:
    embedding = get_sentence_embedding(pattern_sentence)
    X_train.append(embedding.squeeze().cpu().numpy())
    y_train.append(tags.index(tag))

X_train = np.array(X_train)
y_train = np.array(y_train)

# dataset
class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = torch.tensor(X_train, dtype=torch.float32)
        self.y_data = torch.tensor(y_train, dtype=torch.long)

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        return self.n_samples

# параметри тренування
batch_size = 8
hidden_size = 128
output_size = len(tags)
bert_embedding_size = 768
learning_rate = 0.001
num_epochs = 200

dataset = ChatDataset()
train_loader = DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True)

# ініціалізація моделі
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = BERTClassifier(bert_embedding_size, hidden_size, output_size).to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

# тренування моделі
print("Початок тренування...")
for epoch in range(num_epochs):
    for (sentences, labels) in train_loader:
        sentences = sentences.to(device)
        labels = labels.to(device)

        outputs = model(sentences)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    if (epoch + 1) % 20 == 0 or epoch == 0:
        print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}")

print(f"Фінальна втрата: {loss.item():.4f}")

# збереження моделі
data = {
    "model_state": model.state_dict(),
    "tags": tags,
    "hidden_size": hidden_size,
    "output_size": output_size
}

torch.save(data, "bert_model.pth")
print("Модель збережено як bert_model.pth")
