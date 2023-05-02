import { useEffect, useState ,useReducer } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/receipe-item"; 
import FavoriteItem from "../../components/favorite-item";
import "./style.css";

const reducer  = (state,action) =>{
    switch(action.type){
        case "filters":
            // console.log('reducerAction',action)
            return {
                ...state,
                filteredValue: action.value
            };
            default:
                return state;

    }
}
const initialState = {
    filteredValue : ''
}
const HomePage = () =>{
    //loading state
    const [loading,setLoading] = useState(false);

    //store results fetch from api
    const [receipes,setReceipes] = useState([]);

    //store favorite receipe list array
    const [favorites,setFavorites] = useState([]);

    //state for api is success or not
    const [apiCallSuccess,setApiCallSuccess] = useState(false);

    //use reducer hooks
    const [filteredState,dispatch] = useReducer(reducer,initialState);

    const getDataFromSearchComponent = (getData) =>{
        // console.log('getData',getData);
        // set loading state true before we call api
        setLoading(true); 
        //call api
        async function getReceipes() {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '92b2fddb81msh33761ab8fe8e5ecp1a201ajsn2b68b233bd1f',
                    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
                }
            };
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0222a264924a44d1acdaf595d9ef9369&query=${getData}&number=10`);
            const result  = await apiResponse.json();
            //use object destructor syntax to extract hints property from result obj
            const {results} = result; 
            // console.log('result',hints);
            if(results && results.length > 0){
                setLoading(false); //set loading false after data fetch
                setReceipes(results);
                setApiCallSuccess(true); 
            }
        }
        getReceipes()
    }

    const addToFavorites = (currentRecipeItem) => {
        // console.log('@receipeid',currentRecipeItem);
        //... spread operator is used to expand array into new array without affecting original
        let copyFavorite = [...favorites]; //add to favorites
        //remove duplicate favorites from favorites array
        const filter = copyFavorite.findIndex(item => item.id === currentRecipeItem.id);
        //if filter == -1 then not present
        if(filter === -1){
            copyFavorite.push(currentRecipeItem);
            setFavorites(copyFavorite);
            //store in localstorage as string 
            localStorage.setItem('favorites',JSON.stringify(copyFavorite));
        }else{
            alert("Already in favorites");
        }
    }
    // console.log('loading & receipes',loading,receipes);
    // console.log('@favorites',favorites);
    // console.log('@apicall',apiCallSuccess);

    const removeFromFavorites = (currentItemId) => {
       
        let favoritesData = [...favorites];
        //remove item list whose id = currentItem ,filter() is used to remove data from array list
         favoritesData = favoritesData.filter(item => item.id !== currentItemId);
        // console.log(currentItemId,favoritesData)
        setFavorites(favoritesData);
        localStorage.setItem('favorites',JSON.stringify(favoritesData));
    }

    useEffect(()=>{
       const extractFavoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
    //    console.log('extract',extractFavoritesFromLocalStorage);
       if(extractFavoritesFromLocalStorage !== null){
            setFavorites(extractFavoritesFromLocalStorage);
       }
    },[]);

    // console.log("#filteredState",filteredState)
    //filter favorites items using includes() which check if a given string contains or not
    const filterFavoritesItems = favorites.filter((item) => 
        item.title.toLowerCase().includes(filteredState.filteredValue)
    );

    return (
        <section class="menu menu-page" id="menu">
            <Search getDataFromSearchComponent = {getDataFromSearchComponent} 
                apiCallSuccess={apiCallSuccess} setApiCallSuccess={setApiCallSuccess}></Search>
            {/* show loading state */}
            {
                loading && <div>Loading...</div>
           }
             {/* render favorites receipes */}
             <div className="featured">
                <div className="title-text">
                    <h2>Favorites</h2>
                </div>
                <div className="search-favorites">
                    <input type="text"
                    onChange={(e)=>dispatch({type:"filters",value:e.target.value})}
                    value={filteredState.filteredValue}
                    name="searchFavorites" placeholder="Search Favorites ..."/>
                </div>
                <div className="content">
                    {
                        filterFavoritesItems && filterFavoritesItems.length > 0 ? filterFavoritesItems.map((item,index) => (
                            <FavoriteItem id={item.id} image={item.image} title={item.title}
                            removeFromFavorites={()=>removeFromFavorites(item.id)} />
                        )) : null
                    }
                </div>
            </div>
            {/* render receipes */}
            <div className="popular">
                <div class="title-text">
                    <h2>Popular This Month</h2>
                </div>
                <div className="content">
                {
                    receipes && receipes.length > 0 ? receipes.map((item,index) => (
                        <RecipeItem id={item.id} image={item.image} title={item.title} 
                        addToFavorites={()=>addToFavorites(item)}/>
                    )) : null
                }
                </div>
            </div>
           
        </section>
    )
};
export default HomePage;

/*
props concept 
-> use to pass data from one component to other
-> we can pass data from parent to child and viceversa

here, we are getting value from search ie child to parent.
In order to get value from child, we need to first pass method to child as props.
For e.g. 
    we create getDataFromSearchComponent method to get value from search component and 
    pass method as property to Search component

useEffect Hooks
useEffect is a hook in React that allows developers to manage side effects in a React component.
useEffect hook takes two parameters: a function that describes the side effect, 
 and an optional array of dependencies that determine when the side effect should be re-run. 


 useReducer Hooks
  -similar to useState but it lets us move the state update logic 
  from event handlers into a single function outside of our component.
  it accepts 3 args:
  - reducer function
  - initial state
  - callback function that is called after the state has been updated(optional)

  for eg:
  const [filteredState,dispatch] = useReducer(reducer,initialState);
  dipatch method will dispatch action base on action type nd return result

    -This event will be dispatched when filter-search input onchange event is triggered.
    - We prefer useReducer when: 
        =>js objects or array as state
        =>complex logic 
    
*/