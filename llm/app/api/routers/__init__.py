from fastapi import APIRouter

from .chat import chat_router  # noqa: F401

api_router = APIRouter()
api_router.include_router(chat_router, prefix="/chat")
