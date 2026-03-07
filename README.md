# ATS Tracking System

A comprehensive Applicant Tracking System (ATS) built with React, Vite, and Tailwind CSS. This application serves two primary user roles: Candidates and Recruiters, featuring streamlined workflows for job applications and resume management.

## Features

### For Candidates
*   **Intuitive Dashboard**: At-a-glance view of application status and recent activity.
*   **Job Search & Discovery**: Browse, search, and filter job listings effectively.
*   **Application Tracking**: Monitor the progress of submitted applications in real-time.
*   **Profile Management**: Update professional information and resume details.
*   **Saved Jobs**: Bookmark interesting positions for later application.

### For Recruiters
*   **Hiring Dashboard**: Analytics-driven overview of the entire hiring pipeline.
*   **Job Management**: Post, edit, manage, and close job listings seamlessly.
*   **Applicant Review**: Detailed candidate profiles with integrated resume parsing.
*   **Resume Analysis**: Advanced insights on candidate qualifications and fit.
*   **Analytics**: Visual reports on hiring metrics and source performance.

## Tech Stack
*   **Frontend**: React.js (v18+)
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Routing**: React Router DOM (v6)
*   **State Management**: Context API
*   **Charts**: Recharts

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Naveen-nexus/ATS_TRACKING_SYSTEM.git
    cd ATS_TRACKING_SYSTEM
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── assets/         # Static assets (images, fonts, global styles)
├── components/     # Reusable UI components and charts
├── context/        # Global state providers (Auth, Theme)
├── data/           # Mock data for prototyping
├── hooks/          # Custom React hooks (useAuth, useTheme)
├── layouts/        # Application layouts (Auth, Dashboard)
├── pages/          # Application pages (Auth, Candidate, Recruiter)
└── utils/          # Helper functions and utilities
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

MIT License
