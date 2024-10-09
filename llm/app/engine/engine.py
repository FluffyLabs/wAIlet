import os
from typing import List

from llama_index.core.agent import AgentRunner
from llama_index.core.callbacks import CallbackManager
from llama_index.core.settings import Settings
from llama_index.core.tools import BaseTool
from llama_index.core.tools.query_engine import QueryEngineTool


def get_chat_engine(event_handlers=None):
    system_prompt = os.getenv("SYSTEM_PROMPT")
    tools: List[BaseTool] = []
    callback_manager = CallbackManager(handlers=event_handlers or [])

    return AgentRunner.from_llm(
        llm=Settings.llm,
        tools=tools,
        system_prompt=system_prompt,
        callback_manager=callback_manager,
        verbose=True,
    )
