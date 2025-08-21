"""
SpotFlow API
Copyright (c) 2025 SpotFlow Krzysztof Poziomek
Licensed under MIT License
"""
from typing import List, Dict, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from spotflow_api.routes import spots

app = FastAPI(
    title="SpotFlow API",
    description="API for SpotFlow, for discovering water sports spots",
    version="0.1.0",)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app", "https://spotflow.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to SpotFlow API!"}
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "SpotFlow API"}


app.include_router(spots, prefix="/api")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")