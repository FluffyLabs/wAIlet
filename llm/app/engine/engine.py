from llama_index.core.settings import Settings

from app.engine.prompt import SYSTEM_PROMPT
from app.engine.models import AssistantResponse


def get_chat_engine():
    sllm = Settings.llm.as_structured_llm(AssistantResponse)

    sllm.system_prompt = SYSTEM_PROMPT
    return sllm
