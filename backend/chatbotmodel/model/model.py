import torch
import torch.nn as nn

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
