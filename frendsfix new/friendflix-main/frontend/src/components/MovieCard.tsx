import { Link } from "react-router-dom";
import { tmdbImageUrl } from "../backend";
import { Movie } from "../types";
import './MovieCard.css';



export default function MovieCard(movie: Movie) {
    const { id, title, release_date, poster_path, watched } = movie;
    const poster = tmdbImageUrl(poster_path, "w154");
    return (
        <Link to={`/movie/${id}`} state={movie}>
            <div className="movie-card">
                {watched && <div className="watched-overlay">✅</div>}
                <img src={poster} alt={title} />
                <div className="movie-info">
                    <h3>{title}</h3>
                    <p>{release_date}</p>
                </div>
            </div>
        </Link>
    )
}
