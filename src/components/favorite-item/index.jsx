import "./style.css";

const FavoriteItem = (props) => {
    const {id,image,title} = props; //destructor
    // console.log('items',props);
    return (
            <div class="box menu-page" key={id}>
                <div class="imgbox">
                    <img src={image} alt={title} />
                </div>
                <div class="text">
                    <h3>{title}</h3>
                    <a class="order-btn">Remove from Favorite</a>
                </div>
            </div>
    )
}
export default FavoriteItem;