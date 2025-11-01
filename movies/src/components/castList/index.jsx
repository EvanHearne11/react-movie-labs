import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { CircularProgress, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const CastList = ({ movieId }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movieCredits", { id: movieId }],
    queryFn: getMovieCredits,
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  const cast = data?.cast?.slice(0, 8); // top 8 actors

  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Cast
      </Typography>

      <Grid container spacing={2}>
        {cast?.map((actor) => (
          <Grid item xs={6} sm={4} md={3} key={actor.id}>
            <Card sx={{ cursor: "pointer", "&:hover": { transform: "scale(1.05)" }, transition: "0.3s" }}>
              <CardMedia
                component="img"
                height="240"
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
              />
              <CardContent>
                <Typography variant="subtitle1" component="p">
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  as {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CastList;
