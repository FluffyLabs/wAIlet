# wAIlet-LLM
## Getting Started

First, setup the environment with poetry:

```
poetry install
poetry shell
```

Then check the parameters that have been pre-configured in the `.env.example` file in this directory. (E.g. you might need to configure an `OPENAI_API_KEY` if you're using OpenAI as model provider). Rename `.env.example` to `.env`.

Second, run the development server:

```
python main.py
```

The example provides two different API endpoints:

1. `/api/chat` - a streaming chat endpoint
2. `/api/chat/request` - a non-streaming chat endpoint

Open [http://localhost:8000/docs](http://localhost:8000/docs) with your browser to see the Swagger UI of the API.

The API allows CORS for all origins to simplify development. You can change this behavior by setting the `ENVIRONMENT` environment variable to `prod`:

```
ENVIRONMENT=prod python main.py
```
