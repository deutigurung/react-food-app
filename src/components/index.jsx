import './style.css'

const Search = () =>{
    return (
        <form className="search-page">
            <input type="text" name="search" id="search" placeholder="Search..." />
            <button type="submit">Search</button>
        </form>
    )
};
export default Search;