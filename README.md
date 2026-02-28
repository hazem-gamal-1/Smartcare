# Smartcare 🏥

A full-stack healthcare platform that bridges the gap between patients and certified medical professionals through AI-powered health tools, smart appointment management, and role-based dashboards.

**Live Demo:** [https://smartcare-two.vercel.app](https://smartcare-two.vercel.app)

---

## Overview

Smartcare is built for both patients and doctors. Patients can explore AI health tools for instant insights, browse specialists, and book appointments — all without leaving the platform. Doctors get a dedicated dashboard to manage their appointments and patient records. Access is secured through Clerk authentication, with separate onboarding flows and experiences for each role.

---

## Features

### 🤖 AI Health Tools — powered by Google Gemini 2.5 Flash

| Tool | Description |
|------|-------------|
| Health Chatbot | A conversational assistant that answers general health questions and guides users toward appropriate care |
| Hydration Coach | Calculates a personalized hydration score, daily water goal, and an hourly intake timeline based on activity and climate |
| Stress Coach | Analyzes stress levels, sleep, and lifestyle to recommend breathing exercises, mindfulness techniques, and daily habits |
| Heart Risk Analyzer | Evaluates cardiovascular risk using health metrics and lifestyle data, returning a risk score with a personalized action plan |
| Drug Advisor | Reviews medications for interactions, provides correct dosage guidance, side effect awareness, and monitoring advice |
| Diet & Fitness Planner | Generates a weekly meal and workout plan tailored to the user's body stats, goals, and activity level |
| Recommendation Engine | Matches users to the most relevant doctors and AI tools based on a free-text description of their health concern |

### 🏥 Platform

- **Role-based onboarding** — Separate sign-up flows for patients and doctors, with profile completion required before accessing the platform.
- **Doctor discovery** — Browse and filter doctors by medical specialty and view their full profiles.
- **Appointment management** — Book, view, and track appointments with full history for both patients and doctors.
- **Dual dashboards** — Each role gets a tailored dashboard that surfaces the most relevant information and actions.
- **Light and dark mode** — Theme preference toggled from the nav bar and persisted across sessions.
- **Fully responsive** — Adaptive layouts across mobile, tablet, and desktop with a collapsible mobile menu.

---

## Tech Stack ⚙️

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Auth | Clerk |
| Database ORM | Prisma |
| AI | Google Gemini (`@google/generative-ai`) |
| State Management | Zustand |
| Animations | Framer Motion |
