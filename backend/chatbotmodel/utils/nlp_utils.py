from transformers import AutoTokenizer, AutoModel
import torch

# завантаження україномовної BERT-моделі
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
    # використовується CLS-токен як ембеддінг фрази
    sentence_embedding = outputs.last_hidden_state[:, 0, :]
    return sentence_embedding
