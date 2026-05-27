import re
import fitz
import spacy

from .skills import SKILLS_DB

nlp = spacy.load("en_core_web_sm")


def extract_text_from_pdf(pdf_path):

    text = ""

    doc = fitz.open(pdf_path)

    for page in doc:
        text += page.get_text()

    return text


def extract_email(text):

    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+"

    match = re.search(pattern, text)

    return match.group(0) if match else None


def extract_phone(text):

    pattern = r"\+?\d[\d\s\-]{8,15}"

    match = re.search(pattern, text)

    return match.group(0) if match else None


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))


def extract_name(text):

    unwanted_words = [
        "python",
        "developer",
        "engineer",
        "react",
        "django",
        "javascript",
        "java",
        "backend",
        "frontend",
        "fullstack",
        "full",
        "stack",
        "api",
        "sql",
        "mongodb",
        "flask",
        "node",
        "js",
        "surat",
        "pune",
        "mumbai",
        "delhi",
        "india"
    ]

    # Only analyze first few lines
    first_lines = text.split('\n')[:5]

    cleaned_text = " ".join(first_lines)

    doc = nlp(cleaned_text)

    for ent in doc.ents:

        if ent.label_ == "PERSON":

            words = []

            for word in ent.text.split():

                clean_word = word.strip()

                if clean_word.lower() not in unwanted_words:

                    words.append(clean_word)

            cleaned_name = " ".join(words)

            # Final validation
            if (
                len(cleaned_name.split()) >= 2
                and len(cleaned_name.split()) <= 3
                and not any(char.isdigit() for char in cleaned_name)
            ):

                return cleaned_name.title()

    return "Unknown"