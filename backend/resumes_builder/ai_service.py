import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

MODEL_NAME = "llama-3.1-8b-instant"


def improve_text(text, section):

    prompts = {

        "summary": f"""
        Rewrite this professional summary for a resume.

        Rules:
        - Keep it under 60 words
        - Professional and ATS friendly
        - Do NOT add fake experience
        - Do NOT use generic buzzwords
        - Keep original meaning
        - Output only the final summary

        Text:
        {text}
        """,

        "experience": f"""
        Rewrite this work experience professionally.

        Rules:
        - Convert into concise resume bullet points
        - Use action verbs
        - Keep original meaning
        - Do NOT invent technologies or achievements
        - Keep it ATS friendly
        - Output only bullet points

        Text:
        {text}
        """,

        "skills": f"""
        Organize these skills professionally for a resume.

        Rules:
        - Keep concise
        - Comma separated
        - Remove duplicates
        - Output only skills

        Text:
        {text}
        """
    }

    response = client.chat.completions.create(

        model=MODEL_NAME,

        messages=[
            {
                "role": "system",
                "content": "You are a professional ATS resume writer."
            },
            {
                "role": "user",
                "content": prompts[section]
            }
        ],

        temperature=0.3,

        max_tokens=300
    )

    return response.choices[0].message.content.strip()