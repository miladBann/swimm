import React, { useState, useEffect } from "react";
import "./show-card.css";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function ShowCard({ show, onFavorite }) {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(fav => fav.show.id === show.show.id);
        setIsFavorited(isFav);
    }, [show]);

    const toggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorited) {
            favorites = favorites.filter(fav => fav.show.id !== show.show.id);
        } else {
            favorites.push(show);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorited(!isFavorited);
        onFavorite(favorites);
    };

    return (
        <div className="card">
            <div>
                <figure>
                    {show.show.image ? (
                        <img src={show.show.image.medium} alt={show.show.name} />
                    ) : (
                        <div>No image</div>
                    )}
                </figure>
            </div>

            <div className="card_right_Side">
                <div className="show_info">
                    <div>
                        <p className="show_title">{show.show.name}</p>
                        <p className="rating">
                            {show.show.rating && show.show.rating.average ? show.show.rating.average : "No rating available"}
                        </p>
                    </div>
                    <p className="category">
                        {show.show.genres.length > 0 ? show.show.genres.join(" | ") : "No genres available"}
                    </p>
                </div>

                <div onClick={toggleFavorite}>
                    {isFavorited ? (
                        <MdFavorite className="fav_icon" style={{ color: "red" }} />
                    ) : (
                        <MdFavoriteBorder className="fav_icon" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowCard;
