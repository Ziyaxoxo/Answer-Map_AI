# Answer Map AI - AI Assessment Extraction & Answer Mapping

**Answer Map AI** is a production-grade web application with an **Express Node.js Backend Server** and **React TypeScript Frontend**, built for teachers to upload question papers and student handwritten answer sheets, automatically extract printed questions and handwritten answers, handle complex edge cases (out-of-order answers, sub-parts like 11a/11b, unanswered questions, and unmatched answer notes), compute exact bounding-box answer regions, and present an interactive side-by-side review workspace with full editing, custom bounding box drawing, AI feedback, user authentication, and AI Teacher Assistant Chat.

---

## 🚀 Quick Start & Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Setup & Launch Steps

1. **Navigate to the Project Directory**:
   ```bash
   cd C:\Users\FAIHA\.gemini\antigravity\scratch\answer-map-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and enter your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   VITE_APP_NAME=Answer Map AI
   PORT=5000
   ```

4. **Start the Backend Server (Express REST API)**:
   ```bash
   npm run server
   ```
   *The backend API starts on `http://localhost:5000`.*

5. **Launch Frontend Development Server** (in a separate terminal):
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

6. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 📋 Comprehensive Feature Audit & Updates

| Requirement / Feature | Implementation Detail & Mapping |
| :--- | :--- |
| **Standalone Login & Sign Up Screen** | First screen presented to users (`LoginPage.tsx`). Validates JWT tokens and allows registration as Teacher or Staff with custom School selection. |
| **JWT Authentication** | Node.js Express REST API server issuing JWT tokens (`Authorization: Bearer <token>`) with session persistence in `localStorage`. |
| **Locked Application Name** | Set as constant string `const APP_NAME = "Answer Map AI";` locked across all headers, sidebars, settings, and pages. |
| **AI Teacher's Toolkit** | Interactive AI Chatbot modal powered by Google Gemini 2.5 Flash API for generating rubrics, remedial plans, and class summaries. |
| **Sidebar Navigation** | Every sidebar item is 100% functional: `Home` (Dashboard overview & stats), `My Classroom` (Class roster & performance), `Assignments` (Test tracking), `Exams` (Main Workspace), `My Library` (Archive repository), `Settings` (AI model & SRS rules), `AI Teacher's Toolkit` (AI Chatbot). |
| **Sample Demo & Document View** | 1-Click "Load Sample Biology Exam Demo" instantly loads the full 13-question Biology exam dataset with crystal clear page rendering, non-blank question cards, AI feedback accordions, and interactive SVG green bounding boxes (`Q1`, `Q2`, `Q5`, `Q11a`). |
| **Settings Page** | Production-grade settings page for configuring AI Vision models, API key verification, and SRS extraction rules. |

---

## ⚡ Pre-Loaded Sample Demo
Click the **"Load Sample Biology Exam Demo"** button on the upload screen or home dashboard for instant testing!
