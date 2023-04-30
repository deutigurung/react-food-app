import { useEffect, useState } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/receipe-item"; 
import FavoriteItem from "../../components/favorite-item";
import "./style.css";

const HomePage = () =>{
    //loading state
    const [loading,setLoading] = useState(false);

    //store results fetch from api
    const [receipes,setReceipes] = useState([]);

    //store favorite receipe list array
    const [favorites,setFavorites] = useState([]);

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
            const apiResponse = await fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${getData}&category%5B0%5D=generic-foods&health%5B0%5D=alcohol-free`,options);
            const result  = await apiResponse.json();
            //use object destructor syntax to extract hints property from result obj
            const {hints} = result; 
            // console.log('result',hints);
            if(hints && hints.length > 0){
                setLoading(false); //set loading false after data fetch
                setReceipes(hints);
            }
        }
        getReceipes()
    }

    const addToFavorites = (currentRecipeItem) => {
        // console.log('@receipeid',currentRecipeItem);
        let copyFavorite = [...favorites]; //add to favorites
        //remove duplicate favorites from favorites array
        const filter = copyFavorite.findIndex(item => item.food.foodId === currentRecipeItem.food.foodId);
        //if filter == -1 then not present
        if(filter == -1){
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

    useEffect(()=>{
       const extractFavoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
    //    console.log('extract',extractFavoritesFromLocalStorage);
       setFavorites(extractFavoritesFromLocalStorage);
    },[]);

    return (
        <section class="menu menu-page" id="menu">
            <Search getDataFromSearchComponent = {getDataFromSearchComponent}></Search>
            {/* show loading state */}
            {
                loading && <div>Loading...</div>
            }
             {/* render favorites receipes */}
             <div className="featured">
                <div className="title-text">
                    <h2>Favorites</h2>
                </div>
                <div className="content">
                    {
                        favorites && favorites.length > 0 ? favorites.map((item,index) => (
                            <FavoriteItem id={item.food.foodId} image={item.food.image} title={item.food.label} />
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
                        <RecipeItem id={item.food.foodId} image={item.food.image} title={item.food.label} 
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
 For e.g.
    
*/