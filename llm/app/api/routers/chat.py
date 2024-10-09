import logging

from fastapi import APIRouter
from llama_index.core.chat_engine.types import NodeWithScore
from llama_index.core.llms import MessageRole

from app.api.routers.models import (
    ChatData,
    Extrinsic,
    Message,
    Result,
)
from app.engine.engine import get_chat_engine

chat_router = r = APIRouter()

logger = logging.getLogger("uvicorn")


@r.post("/request")
async def chat_request(
    data: ChatData,
) -> Result:
    last_message_content = data.get_last_message_content()
    messages = data.get_history_messages()

    chat_engine = get_chat_engine()

    response = await chat_engine.achat(last_message_content, messages)
    return Result(
        message=Message(role=MessageRole.ASSISTANT, content=response.response),
        action=Extrinsic(txType="api.tx.xcmPallet.teleportAssets", data={}),
    )
