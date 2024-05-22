
import { useEffect, useState } from 'react';
import './card.css';
import { Movie } from './types';
import { Link } from 'react-router-dom';
import { useLastMovie } from './lastMovieCtx';


function MovieCard(movie: Movie) {
    const poster_quality = "w500";
    const full_poster_path = `https://image.tmdb.org/t/p/${poster_quality}${movie.poster_path}`;
    return <Link to={`/movie/${movie.id}`}>
        <div className="movie_card" id="bright" key={movie.id}>
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina" src={full_poster_path} alt={movie.title} />
                    <h1>{movie.title}</h1>
                    <h4>{movie.release_date}</h4>
                </div>
                <div className="movie_desc">
                    <p className="text">
                        {movie.overview}
                    </p>
                </div>
                <div className="movie_social">
                    <ul>
                        <li><i className="fa fa-star"></i> Stars: {movie.vote_average}</li>
                        <li><i className="fa fa-thumbs-up"></i> Vote: {movie.vote_count}</li>
                    </ul>
                </div>
            </div>
            <div className="blur_back bright_back"></div>
        </div>
    </Link>
}


export function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [lastMovie, setLastMovie, clearLastMovie] = useLastMovie();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?&sort_by=revenue.desc&api_key=ffe5c55abd58ac422555285b6b0f1e30')
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });

    }, []);


    return (
        <>
            <h2>The last movie you watched was {lastMovie}</h2>
            <button onClick={clearLastMovie}>Clear last movie</button>
            {movies.map(movie => <MovieCard {...movie} key={movie.id}/>)}
        </>
    );

}

export default MovieCard;