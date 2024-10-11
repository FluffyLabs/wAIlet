from typing import Optional
from pydantic import BaseModel

from app.polkadot.models import Transaction


class AssistantResponse(BaseModel):
    message: str
    transaction: Optional[Transaction] = None
