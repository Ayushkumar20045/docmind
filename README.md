# DocMind

> Turn documents into conversations.

DocMind is a Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents and interact with them using natural language. Instead of relying solely on an LLM's pre-trained knowledge, DocMind retrieves the most relevant information from uploaded documents before generating a response.

---

## How It Works

```text
PDF
 │
 ▼
Text Extraction
 │
 ▼
Recursive Chunking
 │
 ▼
Sentence Embeddings
 │
 ▼
ChromaDB
 │
 ▼
Semantic Retrieval
 │
 ▼
LLM Response
```

---

## Features

- Upload PDF documents
- Automatic text extraction
- Intelligent recursive chunking
- Semantic vector search
- Context-aware retrieval
- REST API built with FastAPI

---

## Tech Stack

**Frontend**

- React
- TypeScript
- Tailwind CSS
- Axios

**Backend**

- FastAPI
- LangChain
- Sentence Transformers
- ChromaDB
- PyPDF

---

## Project Structure

```
docmind
├── client
├── server
└── docs
```

---

## Current Progress

- PDF Upload
- Text Extraction
- Recursive Chunking
- Embedding Generation
- Vector Database
- Semantic Retrieval API

---

## Next Milestones

- Gemini Integration
- Conversational Chat Interface
- Source Citations
- Multi-document Support

---

Built while exploring modern Retrieval-Augmented Generation systems from the ground up.