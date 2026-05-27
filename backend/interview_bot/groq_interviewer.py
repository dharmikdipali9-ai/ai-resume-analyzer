import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

MODEL_NAME = "llama-3.1-8b-instant"


def generate_interview_reply(
    role,
    skills,
    conversation
):

    system_prompt = f"""
    You are an AI interviewer.

    Conduct a professional mock interview.

    Role:
    {role}

    Skills:
    {skills}

    Rules:
    - Ask ONLY one interview question at a time
    - Keep responses SHORT and concise
    - Maximum 2-3 lines per response
    - Do not give lengthy explanations
    - Ask realistic interview questions
    - Give brief feedback when needed
    - Be professional and conversational
    """

    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    for msg in conversation:

        messages.append({
            "role": msg["role"],
            "content": msg["content"]
        })

    response = client.chat.completions.create(

        model=MODEL_NAME,

        messages=messages,

        temperature=0.5,

        max_tokens=120
    )

    return response.choices[0].message.content