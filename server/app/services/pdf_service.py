from pathlib import Path
import shutil

from fastapi import UploadFile
from pypdf import PdfReader


UPLOAD_DIRECTORY = Path("uploads")
UPLOAD_DIRECTORY.mkdir(exist_ok=True)


def save_pdf(file: UploadFile):
    file_path = UPLOAD_DIRECTORY / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:
        text = page.extract_text()

        if text:
            extracted_text += text

    return {
        "filename": file.filename,
        "file_size": file_path.stat().st_size,
        "pages": len(reader.pages),
        "characters": len(extracted_text),
        "message": "Document uploaded successfully",
    }