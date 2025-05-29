from rest_framework.decorators import api_view
from rest_framework.response import Response
from chatbotmodel.chat import get_response
import logging

logger = logging.getLogger(__name__)

@api_view(["POST"])
def chat_api(request):
    user_message = request.data.get("message", "")
    if not user_message:
        return Response({"error": "No message provided."}, status=400)
    
    try:
        bot_reply = get_response(user_message)
        return Response({"response": bot_reply})
    except Exception as e:
        logger.exception("Помилка у get_response")
        return Response({"error": "Internal server error."}, status=500)
