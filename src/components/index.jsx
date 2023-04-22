import { useState } from 'react';
import './style.css'

const Search = () =>{
    const [searchValue,setSearchValue] = useState('') //initial value

    const handleSearchValue = (event) =>{
        const {value} = event.target;
        setSearchValue(value);
    }
    // console.log(searchValue);
    return (
        <form className="search-page">
            <input value={searchValue} onChange={handleSearchValue}
            type="text" name="search" id="search" placeholder="Search..." />
            <button type="submit">Search</button>
        </form>
    )
};
export default Search;