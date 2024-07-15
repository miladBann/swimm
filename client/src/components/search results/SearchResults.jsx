import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowCard from "../show card/ShowCard";

function SearchResults({ searchInput, onFavoriteUpdate }) {
    const [tvShows, setTvShows] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchTvShow = async () => {
        try {
            if (searchInput) {
                setIsSearching(true);
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchInput}`);
                setTvShows(response.data);
                setIsSearching(false);
            } else {
                setTvShows([]);
            }
        } catch (error) {
            console.log(error);
            setIsSearching(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTvShow();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div>
            {isSearching && <p>Loading...</p>}
            {tvShows.length > 0 ? (
                tvShows.map((show, index) => (
                    <ShowCard key={index} show={show} onFavorite={onFavoriteUpdate} />
                ))
            ) : (
                !isSearching && <div className="no_results">No results</div>
            )}
        </div>
    );
}

export default SearchResults;
