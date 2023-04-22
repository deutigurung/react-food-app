import Search from "../../components";
const HomePage = () =>{
    const getDataFromSearchComponent = (getData) =>{
        console.log('getData',getData);

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