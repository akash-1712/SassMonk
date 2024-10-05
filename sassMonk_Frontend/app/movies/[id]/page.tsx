// app/movies/[id]/page.tsx
import MovieDetail from "../../components/MovieDetails";

interface MoviePageProps {
  params: {
    id: string;
  };
}
const MoviePage: React.FC<MoviePageProps> = ({ params }) => {
  return (
    <div>
      <MovieDetail id={params.id} />
    </div>
  );
};

export default MoviePage;
