import express, { Request, Response, NextFunction } from "express";
import { PrismaClient, Movie, Review } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.status(200).json({});
  }
  next();
});

interface CreateMovieRequest {
  name: string;
  releaseDate: Date;
}

interface UpdateMovieRequest extends CreateMovieRequest {}

interface CreateReviewRequest {
  movieId: number;
  reviewerName: string;
  rating: number;
  comments?: string;
}

interface UpdateReviewRequest {
  reviewerName?: string;
  rating?: number;
  comments?: string;
}

app.post(
  "/movies",
  async (req: Request<{}, Movie, CreateMovieRequest>, res: Response) => {
    const { name, releaseDate } = req.body;
    const movie = await prisma.movie.create({
      data: { name, releaseDate },
    });
    res.json(movie);
  }
);

app.get("/movies", async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
});

app.get("/movies/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: { reviews: true },
  });
  res.json(movie);
});

app.put(
  "/movies/:id",
  async (
    req: Request<{ id: string }, {}, UpdateMovieRequest>,
    res: Response
  ) => {
    const { id } = req.params;
    const { name, releaseDate } = req.body;
    const movie = await prisma.movie.update({
      where: { id: Number(id) },
      data: { name, releaseDate },
    });
    res.json(movie);
  }
);

app.delete(
  "/movies/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    await prisma.movie.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Movie deleted successfully" });
  }
);

app.post(
  "/reviews",
  async (req: Request<{}, Review, CreateReviewRequest>, res: Response) => {
    const { movieId, reviewerName, rating, comments } = req.body;
    const review = await prisma.review.create({
      data: { movieId, reviewerName, rating, comments },
    });

    await updateAverageRating(movieId);
    res.json(review);
  }
);

app.get(
  "/movies/:id/reviews",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: { movieId: Number(id) },
    });
    res.json(reviews);
  }
);

app.put(
  "/reviews/:id",
  async (
    req: Request<{ id: string }, {}, UpdateReviewRequest>,
    res: Response
  ) => {
    const { id } = req.params;
    const { reviewerName, rating, comments } = req.body;
    const review = await prisma.review.update({
      where: { id: Number(id) },
      data: { reviewerName, rating, comments },
    });

    await updateAverageRating(review.movieId);
    res.json(review);
  }
);

app.delete(
  "/reviews/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const review = await prisma.review.delete({
      where: { id: Number(id) },
    });

    await updateAverageRating(review.movieId);
    res.json({ message: "Review deleted successfully" });
  }
);

async function updateAverageRating(movieId: number) {
  const reviews = await prisma.review.findMany({
    where: { movieId },
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : null;

  await prisma.movie.update({
    where: { id: movieId },
    data: { averageRating },
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
