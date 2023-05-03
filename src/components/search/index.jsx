import { useEffect, useState } from 'react';
import './style.css'

const Search = (props) =>{
    const [searchValue,setSearchValue] = useState('') //initial value
    const {getDataFromSearchComponent,setApiCallSuccess,apiCallSuccess} = props;

    const handleSearchValue = (event) =>{
        const {value} = event.target;
        setSearchValue(value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        getDataFromSearchComponent(searchValue);

    }
    useEffect(()=>{
        if(apiCallSuccess){
            setSearchValue('')
            setApiCallSuccess(false)
        }
    },[apiCallSuccess,setApiCallSuccess])
    // console.log(searchValue);
    return (
        <form onSubmit={handleSubmit} className="search-page">
            <input value={searchValue} onChange={handleSearchValue}
            type="text" name="search" id="search" placeholder="Search..." />
            <button type="submit">Search</button>
        </form>
    )
};
export default Search;
/*
    here on form submit , handleSubmit() get input variable from form and
    set input variable to getDataFromSearchComponent().
    then, getDataFromSearchComponent pass data to Homepage
*/