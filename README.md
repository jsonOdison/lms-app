ElevateHub — AI-Powered Mini LMS

A minimal, end-to-end LMS prototype built in one day using Next.js, TailwindCSS, and OpenAI.
Deployed on Vercel.
Live demo: https://lms-app-ochre.vercel.app/

Overview

ElevateHub is a compact learning platform built for the assignment:
“In one day, use AI tools to build and deploy a small AI-powered LMS prototype.”

The project focuses strictly on speed, AI-assisted development, and delivering a functional demo with a clean architecture.

Features
1. Landing Page

App title + one-line pitch for founders and teams

Primary CTA: “View Courses”

2. Courses Page

List of sample courses

Each course has a title + short description

3. Course Detail Page

Overview section

Topic breakdown

Progress indicator stored in localStorage

States: Enrolled / Not Enrolled

Progress: Started / Not Started

Enroll button

Reset progress modal

4. AI-Powered Course Tutor

Chatbot powered by OpenAI

Uses course-specific content only

Behaves like a lightweight RAG-lite system

Answers questions strictly based on the material for that course

5. Deployment

Fully deployed on Vercel

GitHub repo is public

Tech Stack

Next.js (App Router)

TailwindCSS

TypeScript

OpenAI API

LocalStorage for progress state

Vercel for hosting

Project Structure
app/
  api/
    chat/        → AI Q&A API route
  courses/       → Course pages + dynamic course detail
  globals.css    → Tailwind + app styles
  layout.tsx     → App shell
  page.tsx       → Landing page

src/
  components/    → UI components (Button, Chatbot, etc.)
  constants/     → Course data + color tokens

How It Works
1. AI-Tutor

A course’s content is injected into the system prompt.
The chatbot answers only using that content, preventing generic LLM responses.

2. Progress Tracking

LocalStorage stores:

enrolledCourses

courseProgress

This avoids backend complexity while satisfying the assignment requirement.

3. Deployment Pipeline

GitHub repo → Vercel auto-deploy

Environment variables for the OpenAI API key

Why This Project Meets the Assignment Goals

Shipped in one day

Heavy use of AI for coding, components, content, and architecture

Fully deployed and functional

Clean LMS slice with enrollment + progress + AI tutor

Uses modern, production-ready tools (Next.js, Tailwind, Vercel)

Running Locally
git clone <repo-url>
cd elevatehub
npm install
npm run dev


Set the env variable:

OPENAI_API_KEY=your-key-here
