import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel
import json
import os

class BERTClassifier(nn.Module):
    def __init__(self, bert_embedding_size=768, hidden_size=128, output_size=8):
        super(BERTClassifier, self).__init__()
        self.fc1 = nn.Linear(bert_embedding_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        return self.fc2(x)

MODEL_NAME = "sentence-transformers/distiluse-base-multilingual-cased-v2"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
bert_model = AutoModel.from_pretrained(MODEL_NAME)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
bert_model.to(device)
bert_model.eval()

def get_sentence_embedding(sentence):
    inputs = tokenizer(sentence, return_tensors="pt", truncation=True, padding=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        outputs = bert_model(**inputs)
    return outputs.last_hidden_state[:, 0, :]  # CLS токен

# завантаження моделі
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "bert_model.pth")

data = torch.load(MODEL_PATH, map_location=device)

model = BERTClassifier(
    data["bert_embedding_size"],
    data["hidden_size"],
    data["output_size"]
).to(device)
model.load_state_dict(data["model_state"])
model.eval()

tags = data["tags"]

with open(os.path.join(BASE_DIR, "../data/intents.json"), encoding="utf-8") as f:
    intents = json.load(f)

def get_response(sentence):
    embedding = get_sentence_embedding(sentence)
    with torch.no_grad():
        output = model(embedding.to(device))
        probs = torch.softmax(output, dim=1)
        prob, predicted = torch.max(probs, dim=1)
        tag = tags[predicted.item()]

        if prob.item() > 0.75:
            for intent in intents["intents"]:
                if intent["tag"] == tag:
                    return intent["responses"][0]

    return "Вибач, я не зрозумів запит. Спробуй інакше."
