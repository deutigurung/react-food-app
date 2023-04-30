import "./style.css";

const RecipeItem = (props) => {
    const {id,image,title,addToFavorites} = props; //destructor
    // console.log('items',props);
    return (
            <div class="box menu-page" key={id}>
                <div class="imgbox">
                    <img src={image} alt={title} />
                </div>
                <div class="text">
                    <h3>{title}</h3>
                    <a class="order-btn" onClick={addToFavorites}>Add to Favorite</a>
                </div>
            </div>
    )
}
export default RecipeItem;