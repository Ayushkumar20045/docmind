# DocMind Development Log

## Day 1 – Project Setup

- Initialized the DocMind project repository.
- Set up React (Vite + TypeScript) frontend.
- Created FastAPI backend structure.
- Planned the RAG architecture and project workflow.
- Organized folders for scalable development.

---

## Day 2 – PDF Upload System

- Implemented PDF upload API using FastAPI.
- Added file validation and local storage.
- Configured CORS and API routing.
- Created health check endpoint.
- Established backend foundation.

---

## Day 3 – RAG Pipeline

- Implemented PDF text extraction.
- Added recursive text chunking.
- Generated embeddings using Sentence Transformers.
- Integrated ChromaDB for vector storage.
- Built semantic retrieval pipeline.

---

## Day 4 – AI Chat Integration

- Integrated Groq LLM for response generation.
- Connected retrieval pipeline with AI prompts.
- Implemented document-based chat API.
- Added automatic document re-indexing.
- Completed the first working RAG chatbot.

---

## Day 5 – Authentication System

- Integrated PostgreSQL with SQLAlchemy ORM.
- Built user registration and login APIs.
- Implemented JWT authentication and password hashing.
- Added protected `/auth/me` endpoint.
- Refactored backend using a Service Layer architecture.