import torch
import random
import json
from chatbotmodel.utils.nlp_utils import get_sentence_embedding
from chatbotmodel.model.model import BERTClassifier
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# завантаження інтентів
with open("chatbotmodel/data/intents.json", "r", encoding="utf-8") as f:
    intents = json.load(f)

# завантаження моделі
FILE = "chatbotmodel/bert_model.pth"
data = torch.load(FILE, map_location=torch.device('cpu'))

tags = data["tags"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
model_state = data["model_state"]

model = BERTClassifier(bert_embedding_size=768, hidden_size=hidden_size, output_size=output_size)
model.load_state_dict(model_state)
model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# === функція, яку імпортуватиме Django ===
def get_response(user_message):
    embedding = get_sentence_embedding(user_message)
    embedding = embedding.to(device)

    with torch.no_grad():
        output = model(embedding)
        probabilities = torch.softmax(output, dim=1)
        confidence, predicted_index = torch.max(probabilities, dim=1)
        predicted_tag = tags[predicted_index.item()]
        confidence = confidence.item()

    if confidence > 0.6:
        for intent in intents["intents"]:
            if intent["tag"] == predicted_tag:
                return random.choice(intent["responses"])
    else:
        return "Вибач, я не зовсім зрозумів. Можеш переформулювати?"
