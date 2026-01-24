import pathway as pw
from pathway.xpacks.llm.vector_store import VectorStoreServer
from pathway.xpacks.llm.embedders import OpenAIEmbedder
from pathway.xpacks.llm.parsers import ParseUnstructured

# 1. SETUP: Watch the 'market_data' folder for live text files
data_sources = [
    pw.io.fs.read(
        "./market_data",  # <--- CREATE THIS FOLDER MANUALLY
        format="binary",
        mode="streaming",
        with_metadata=True,
    )
]

# 2. EMBEDDER: Converts text to numbers (requires OPENAI_API_KEY env var)
# If you don't have OpenAI, you can use HuggingFaceEmbedder (free)
embedder = OpenAIEmbedder()

# 3. SERVER: Starts the RAG API
app = VectorStoreServer(
    *data_sources,
    embedder=embedder,
    parser=ParseUnstructured(),
)

# 4. RUN: Listens on port 8000
if __name__ == "__main__":
    app.run_server(host="0.0.0.0", port=8000, threaded=True)