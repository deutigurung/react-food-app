import Search from "../../components";
const HomePage = () =>{
    const getDataFromSearchComponent = (getData) =>{
        // console.log('getData',getData);
        //call api
        async function getReceipes() {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '92b2fddb81msh33761ab8fe8e5ecp1a201ajsn2b68b233bd1f',
                    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
                }
            };
            const apiResponse = await fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cooking&category%5B0%5D=generic-foods&health%5B0%5D=alcohol-free`,options);
            const result  = await apiResponse.json();
            console.log('result',result);
        }
        getReceipes()
    }
    return (
        <div className="home-page">
            <Search getDataFromSearchComponent = {getDataFromSearchComponent}></Search>
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