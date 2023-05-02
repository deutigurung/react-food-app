import "./style.css";

const FavoriteItem = (props) => {
    const {id,image,title,removeFromFavorites} = props; //destructor
    // console.log('items',props);
    return (
            <div className="box menu-page" key={id}>
                <div className="imgbox">
                    <img src={image} alt={title} />
                </div>
                <div className="text">
                    <h3>{title}</h3>
                    <a className="order-btn" onClick={removeFromFavorites}>Remove from Favorite</a>
                </div>
            </div>
    )
}
export default FavoriteItem;