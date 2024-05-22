import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doMovieAction, getFullMovie, tmdbImageUrl } from "../backend";
import { ActorCard } from "../components/ActorCard";
import { FullMovie } from "../types";
import "./MoviePage.css";

export function MoviePage() {
    const { id } = useParams();
    const movieId = parseInt(id || "");
    const [movie, setMovie] = useState<FullMovie | null>(null);


    useEffect(() => {
        if (!movieId || isNaN(movieId)) setMovie(null);
        getFullMovie(movieId).then(setMovie);
    }, [id]);

    const cast = movie && movie.credits.cast.slice(0, 10);
    const backdrop = movie && tmdbImageUrl(movie.backdrop_path, "w780");
    const poster = movie && tmdbImageUrl(movie.poster_path, "w342") || "";

    if (!movie) {
        return <h1>Loading...</h1>
    }

    const backdropStyle: React.CSSProperties = {
        backgroundImage: `url(${backdrop})`,
    }

    const movieDate = new Date(movie.release_date);

    return (
        <div className="movie-page" style={backdropStyle}>
            <div className="backdrop-overlay"></div>
            <section className="info-section">
                <div className="movie-header">
                    <img className="movie-poster" src={poster} alt={movie.title} />
                    <h1>{movie.title}</h1>
                </div>
                <div className="movie-buttons">
                    <button title="Play" onClick={() => doMovieAction(movieId, "play")}>▶️</button>
                    <button title="Add to Watchlist" onClick={() => doMovieAction(movieId, "watchlist")}>➕</button>
                    <button title="Like" onClick={() => doMovieAction(movieId, "like")}>👍</button>
                </div>
                <h4>{movieDate.getFullYear()}</h4>
                <div className="movie-desc">{movie.overview}</div>
                <div className="movie-social">
                    <ul>
                        <li>Stars: {movie.vote_average}</li>
                        <li>Vote: {movie.vote_count}</li>
                    </ul>
                </div>
                {cast && <div className="cast-cards">{cast.map(ActorCard)}</div>}
            </section>
            <Link to="/"><button>GO BACK</button></Link>
        </div>
    )
}