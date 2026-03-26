const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PROFILE_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/h632";

// 🎬 Format movie object (list view)
export const formatMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    rating: movie.vote_average,
    year: movie.release_date
      ? movie.release_date.split("-")[0]
      : null
  };
};

// 🎬 Format multiple movies
export const formatMovies = (movies) => {
  return movies.map(formatMovie);
};

// 📊 Format detailed movie object (details view)
export const formatMovieDetails = (movie, credits) => {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null,
    rating: movie.vote_average,
    year: movie.release_date
      ? movie.release_date.split("-")[0]
      : null,
    overview: movie.overview || null,
    runtime: movie.runtime || null,
    budget: movie.budget || null,
    revenue: movie.revenue || null,
    genres: movie.genres?.map(g => g.name) || [],
    productionCompanies: movie.production_companies?.map(c => c.name) || [],
    cast: formatCast(credits?.cast || []),
    crew: formatCrew(credits?.crew || [])
  };
};

// 👤 Format cast member
const formatCastMember = (actor) => {
  return {
    id: actor.id,
    name: actor.name,
    character: actor.character || "Unknown",
    profileImage: actor.profile_path
      ? `${PROFILE_IMAGE_BASE_URL}${actor.profile_path}`
      : null
  };
};

// 👥 Format cast (top 12 actors)
export const formatCast = (castList) => {
  return castList
    .filter(actor => actor.profile_path) // Only show actors with profile images
    .slice(0, 12)
    .map(formatCastMember);
};

// 👔 Format crew member
const formatCrewMember = (crewMember) => {
  return {
    id: crewMember.id,
    name: crewMember.name,
    role: crewMember.job,
    department: crewMember.department,
    profileImage: crewMember.profile_path
      ? `${PROFILE_IMAGE_BASE_URL}${crewMember.profile_path}`
      : null
  };
};

// 👔 Format crew (organize by department: Directors, Writers, Producers)
export const formatCrew = (crewList) => {
  const crew = {
    directors: [],
    writers: [],
    producers: []
  };

  crewList.forEach(member => {
    if (member.job === "Director") {
      crew.directors.push(formatCrewMember(member));
    } else if (member.department === "Writing") {
      crew.writers.push(formatCrewMember(member));
    } else if (member.job === "Producer") {
      crew.producers.push(formatCrewMember(member));
    }
  });

  return crew;
};