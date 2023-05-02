import "./style.css";

const RecipeItem = (props) => {
    const {id,image,title,addToFavorites} = props; //destructor
    // console.log('items',props);
    return (
            <div className="box menu-page" key={id}>
                <div className="imgbox">
                    <img src={image} alt={title} />
                </div>
                <div className="text">
                    <h3>{title}</h3>
                    <a className="order-btn" onClick={addToFavorites}>Add to Favorite</a>
                </div>
            </div>
    )
}
export default RecipeItem;