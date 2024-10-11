from enum import Enum
from typing import Literal
from pydantic import BaseModel


class ChainId(str, Enum):
    dot = "dot"
    dotAh = "dotAh"


class Transaction(BaseModel):
    kind: Literal["teleport"]
    source: ChainId
    destination: ChainId
    asset: Literal["DOT"]
    amount: float
