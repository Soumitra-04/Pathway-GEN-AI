# Origyn 🚀 | AI-Powered Brand Strategist

**Origyn** is an end-to-end AI platform that acts as a virtual Chief Marketing Officer (CMO). It takes a simple business idea and instantly generates a comprehensive brand strategy, 15-day content plan, visual identity system, and implementation roadmap using real-time market intelligence.

## ✨ Key Features

### 🧠 1. Intelligent Strategy Generation
Unlike generic text generators, Origyn uses a **RAG (Retrieval-Augmented Generation)** pipeline to fetch real-time market data before generating advice.
- **Brand Core:** Mission, Vision, Values, and Tone of Voice.
- **Business Model:** Lean Canvas, Revenue Streams, and Cost Drivers.
- **Market Analysis:** Competitor gap analysis and USP definition.

### 🎨 2. Visual Identity Engine
- **AI Logo Generation:** Integrates with **Stable Diffusion (Hugging Face)** to generate vector-style logos.
- **Color Psychology:** Suggests hex codes based on emotional impact (e.g., Blue for trust, Red for energy).
- **Typography:** Pairs fonts for headers and body text.

### 📊 3. Predictive Market Analytics
- **Viability Score:** A calculated 0-100 score based on market saturation and demand.
- **Financial Forecasting:** ROI calculator based on ad spend and growth potential.
- **Risk Assessment:** Logic-driven analysis of execution, market, and financial risks based on team size and funding.

### 📅 4. Actionable Marketing Plans
- **15-Day Content Calendar:** Specific post ideas for selected platforms (LinkedIn, Instagram, etc.).
- **Launch Roadmap:** A step-by-step execution plan from Day 0 to Month 6.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Visualization:** Recharts (Data visualization for market trends)
- **PDF Generation:** `jspdf` & `html2canvas` for exporting brand kits.

### **Backend & AI**
- **LLM Engine:** Groq API (Llama 3 70B) for ultra-fast inference.
- **Image Generation:** Hugging Face Inference API (Stable Diffusion / FLUX).
- **RAG Engine:** Python (FastAPI) server using **Pathway** for real-time data indexing.
- **Auth:** Firebase Authentication.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- API Keys for: Groq, Hugging Face, Firebase.

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/origyn.git](https://github.com/yourusername/origyn.git)
cd origyn

How It Works (The Logic):

Input: User provides an idea (e.g., "AI-powered coffee machine"), funding stage, and team size.
Retrieval: The Python backend searches a live knowledge base for "Coffee tech trends 2024".
Synthesis: The LLM (Llama 3) receives the user input + the retrieved market trends.
Refinement:
        If Team = Solo Founder, the system increases "Execution Risk".
        If Market = Saturated, the "Growth Score" is capped.
Generation: The system outputs JSON data for the strategy and prompts Stable Diffusion for logos.
Visualization: The frontend renders this data into interactive charts and downloadable PDFs