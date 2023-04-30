import { useState } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/receipe-item"; 

const HomePage = () =>{
    //loading state
    const [loading,setLoading] = useState(false);

    //store results fetch from api
    const [receipes,setReceipes] = useState([]);

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
    // console.log('loading & receipes',loading,receipes);
    return (
        <div className="home-page">
            <Search getDataFromSearchComponent = {getDataFromSearchComponent}></Search>
            {/* show loading state */}
            {
                loading && <div>Loading...</div>
            }
            {/* render receipes */}
            {
                receipes && receipes.length > 0 ? receipes.map((item,index) => (
                    <RecipeItem id={item.food.foodId} image={item.food.image} title={item.food.label} />
                )) : null
            }
        </div>
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
*/