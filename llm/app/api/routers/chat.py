import logging

from app.api.routers.streaming import vercel_streaming
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from llama_index.core.llms import MessageRole

from app.api.routers.models import (
    ChatData,
    Message,
    Result,
)
from app.engine.engine import get_chat_engine

chat_router = r = APIRouter()

logger = logging.getLogger("uvicorn")


# TODO: make it a real streaming endpoint, not a fake one
@r.post("")
async def chat(
    data: ChatData,
):
    chat_engine = get_chat_engine()

    response = await chat_engine.achat(data.get_all_messages())
    return StreamingResponse(content=vercel_streaming(response.raw))


@r.post("/request")
async def chat_request(
    data: ChatData,
) -> Result:
    chat_engine = get_chat_engine()

    response = await chat_engine.achat(data.get_all_messages())
    return Result(
        message=Message(role=MessageRole.ASSISTANT, content=response.raw.message),
        transaction=response.raw.transaction,
    )
