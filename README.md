# Doctor Dashboard

This project is a Next.js application that provides a dashboard for doctors to manage patient information, view call summaries, and schedule new calls.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Git

## Installation

To install the Doctor Dashboard, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yashthakur22/dashboard.git
   cd dashboard/my-doctor-dashboard
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   npm run db:seed
   ```

## Configuration

1. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL="file:./dev.db"
   ```

2. Ensure your `next.config.js` file includes the necessary configurations:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     images: {
       domains: ['localhost'],
     },
   }

   module.exports = nextConfig
   ```

## Running the Application

To run the Doctor Dashboard, use the following command:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

- Visit `http://localhost:3000/dashboard` to access the doctor dashboard.
- Select a patient from the list to view their details, medications, and call summaries.
- Schedule new calls for patients and add questions for the upcoming calls.

## Database Management

- To view the database content, run:
  ```
  npx prisma studio
  ```
  This will open Prisma Studio in your browser, typically at `http://localhost:5555`.

- To reset the database and re-seed it:
  ```
  npx prisma migrate reset
  ```

## Project Structure

- `/app`: Contains the Next.js application routes and API routes
- `/components`: React components used in the application
- `/lib`: Utility functions and database client
- `/prisma`: Prisma schema and migrations
- `/public`: Static assets

## Dependencies

Main dependencies include:

- Next.js
- React
- Prisma
- TypeScript
- Tailwind CSS (for styling)

For a full list of dependencies, please refer to the `package.json` file.


