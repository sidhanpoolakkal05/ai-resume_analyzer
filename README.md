# AI Resume Analyzer

An intelligent web application designed to analyze and optimize resumes for Applicant Tracking Systems (ATS). Instantly compare your skills against targeted job descriptions with AI precision to measure match potential, evaluate missing skills, and strengthen your resume.

## Live Application
- **Frontend (Vercel)**: [https://ai-resumeanalyser.vercel.app](https://ai-resumeanalyser.vercel.app)
- **Backend API (Render)**: [https://ai-resume-backend-j3on.onrender.com](https://ai-resume-backend-j3on.onrender.com)

## Project Structure

This project is separated into two components:
- `ui-app/`: A React + Vite frontend focused on a dynamic, dark-themed, and responsive user interface.
- `Resume-BackEnd/`: A Python FastAPI backend responsible for analyzing PDF text content using scikit-learn (TF-IDF Similarity), skill extraction, and scoring algorithms.

## Features
- **PDF Resume Upload & Text Extraction**: Effortlessly converts your document format into readable data.
- **Job Description Parsing**: Provide target job roles to analyze for crucial role requirements.
- **ATS Match Score**: Algorithm generates match percentages based on skill detection and full-text keyword similarities.
- **Instant AI Feedback**: Suggestions for missing skills and content improvements.

## Technologies Used
**Frontend**: React, Vite, Lucide-React, CSS (Modern dark aesthetics with mesh gradients and micro-animations)
**Backend**: FastAPI, Uvicorn, Python-Multipart, PDFMiner.six, Scikit-Learn
