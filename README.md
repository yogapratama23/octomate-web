# Next.js App

A Next.js 14 application.

## Requirements
- Node.js v18 or later

## Getting Started

### 1. Clone the repository
    git clone <your-repo-url>
    cd <your-project-folder>

### 2. Install dependencies
    npm install

### 3. Configure environment variables
Create a `.env` file in the project root and fill in the values:

    NEXT_PUBLIC_BASE_URL=http://localhost:3000

### 4. Run the application
Development:

    npm run dev

Production build:

    npm run build
    npm start

## Testing
Run lint:

    npm run lint

## Notes
- The app will run on http://localhost:3000 by default.  
- `NEXT_PUBLIC_BASE_URL` should point to your NestJS API or backend URL.  
