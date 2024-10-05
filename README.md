# Movie Management Application(Sassmonk)

This is a movie management application built using Next.js and TypeScript, allowing users to browse, review, and manage movies efficiently. The app incorporates features that enhance user experience, such as searching for movies, managing reviews, and dynamically updating content.

## Features

- **Home Page**: Displays all movies with a search bar for easy movie searching.
- **Movie Review Page**: Clicking on a movie card opens the movie review page, showcasing all reviews for that movie.
- **Add/Edit Movies and Reviews**: Users can add or edit any movie or review, with updates reflected in real-time on the movie/review list.
- **Delete Movies**: Deleting a movie will also remove all associated reviews, ensuring data consistency.
- **Average Rating Calculation**: The average rating for each movie is calculated based on the reviews it receives.

## Tech Stack Used

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL (SQL DB of choice)
- **ORM**: Prisma
- **API**: REST API
- **Language**: TypeScript
- **State Management**: Context API for app-wide data management

## Links

- **GitHub Repository**: [SassMonk](https://github.com/akash-1712/SassMonk)
- **Live Project**: [Sass Monk Live](https://sass-monk-two.vercel.app/)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/akash-1712/SassMonk.git
   ```
2. Navigate to the project directory: cd ../SassMonk
3. Install the dependencies: npm install
4. Prisma file Generate(backend) : prisma generate
5. Run: npm run dev
