import React from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchLaterIcon from "../components/cardIcons/addToWatchLater";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedMoviesPage = () => {
  const [page, setPage] = React.useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["topRatedMovies", page],
    queryFn: () => getTopRatedMovies(page),
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;
  const totalPages = data?.total_pages ?? 1;

  return (
    <Box sx={{ backgroundColor: "#202136ff", minHeight: "100vh", py: 2 }}>
      <PageTemplate
        title={`Top Rated Movies (Page ${page})`}
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchLaterIcon movie={movie} />
          </>
        )}
      />

      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2e3440",
            color: "#fff",
            "&:hover": { backgroundColor: "#3b4252" },
          }}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2e3440",
            color: "#fff",
            "&:hover": { backgroundColor: "#3b4252" },
          }}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default TopRatedMoviesPage;
