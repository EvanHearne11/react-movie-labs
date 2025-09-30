import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  let movieCards = props.movies.map(
    (movie) => (
      <Grid key={movie.id} xs={12} sm={6} md={4} lg={3}>
        <Movie movie={movie} />
      </Grid>
    )
  );

  return (
    <Grid container spacing={2}>
      {movieCards}
    </Grid>
  );
};

export default MovieList;
