import json
from app.engine.models import AssistantResponse
from pydantic import BaseModel


TEXT_PREFIX = "0:"
DATA_PREFIX = "8:"


def _convert_text(token: str):
    # Escape newlines and double quotes to avoid breaking the stream
    token = json.dumps(token)
    return f"{TEXT_PREFIX}{token}\n"


def _convert_data(data: BaseModel):
    data_str = json.dumps(data.model_dump_json())
    return f"{DATA_PREFIX}[{data_str}]\n"


async def vercel_streaming(result: AssistantResponse):
    yield _convert_text(result.message)
    if result.transaction:
        yield _convert_data(result.transaction)
