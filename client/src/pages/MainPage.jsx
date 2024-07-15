import React, { useState, useEffect } from "react";
import SearchBar from "../components/search bar/SearchBar";
import SearchResults from "../components/search results/SearchResults";
import FavoriteShows from "../components/favorite show/FavoriteShows";

function MainPage() {
    const [searchText, setSearchText] = useState("");
    const [favoriteShows, setFavoriteShows] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavoriteShows(savedFavorites);
    }, []);

    const updateFavorites = (favorites) => {
        setFavoriteShows(favorites);
    };

    return (
        <div className="row">
            <div className="top_row">
                <p className="title">The TV Series Database</p>
                <SearchBar setSearch={setSearchText} />
            </div>

            <div className="mid_row">
                <div>
                    <p className="header">Search Results</p>
                    <SearchResults searchInput={searchText} onFavoriteUpdate={updateFavorites} />
                </div>

                <div>
                    <p className="header">My Favorites</p>
                    <FavoriteShows favorites={favoriteShows} onFavoriteUpdate={updateFavorites} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
