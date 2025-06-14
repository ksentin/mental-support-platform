from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.client import Users
from diagrams.programming.framework import React
from diagrams.generic.blank import Blank
from diagrams.custom import Custom
from diagrams.onprem.compute import Server
from diagrams.onprem.database import PostgreSQL

with Diagram("Mental Health App — Detailed Architecture", show=False, direction="LR"):
    users = Users("Користувачі")

    # Client Side
    with Cluster("Client (Front-end)"):
        react_app = React("React App")
        mood_ui = Custom("Mood Diary", "./icons/mood.png")
        articles_ui = Custom("Articles", "./icons/article.png")
        meditations_ui = Custom("Meditations", "./icons/meditation.png")
        chatbot_ui = Custom("Chatbot", "./icons/chatbot.png")

        react_app >> [mood_ui, articles_ui, meditations_ui, chatbot_ui]

    # Server Side
    with Cluster("Server (Back-end)"):
        django = Server("Django API Server")

        with Cluster("API Endpoints"):
            auth_api = Custom("Auth API", "./icons/auth.png")
            mood_api = Custom("Mood API", "./icons/mood.png")
            articles_api = Custom("Articles API", "./icons/article.png")
            meditations_api = Custom("Meditations API", "./icons/meditation.png")
            chatbot_api = Custom("Chatbot API", "./icons/ai.png")

            django >> [auth_api, mood_api, articles_api, meditations_api, chatbot_api]

    # Database
    with Cluster("Database"):
        db = PostgreSQL("PostgreSQL")
        user_table = Custom("Users Table", "./icons/user.png")
        mood_table = Custom("Mood Entries", "./icons/entry.png")
        article_table = Custom("Articles Table", "./icons/article.png")
        meditation_table = Custom("Meditations Table", "./icons/meditation.png")

        db >> [user_table, mood_table, article_table, meditation_table]

    # NLP / ML Service
    with Cluster("NLP / AI Service"):
        bert_model = Custom("BERT Model", "./icons/ai.png")
        tokenizer = Custom("Tokenizer", "./icons/token.png")
        bert_model >> tokenizer

    # Connections
    users >> react_app
    react_app >> Edge(label="HTTPS (REST API)") >> django
    django >> db
    chatbot_api >> bert_model
    bert_model >> django

    # UI Components to API
    mood_ui >> mood_api
    articles_ui >> articles_api
    meditations_ui >> meditations_api
    chatbot_ui >> chatbot_api
