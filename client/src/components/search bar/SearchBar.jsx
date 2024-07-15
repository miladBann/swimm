import "./search-bar.css";

function SearchBar({setSearch}) {
    const updateSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <input type="text" className="search_bar" onChange={updateSearch}/>
        </div>
    );
}

export default SearchBar;