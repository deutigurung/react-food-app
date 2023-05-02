import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const FavoriteItem = (props) => {
    const {id,image,title,removeFromFavorites} = props; //destructor
    // console.log('items',props);
    const {theme,setTheme} = useContext(ThemeContext);
    return (
            <div className="box menu-page" style={theme ? {border:"10px solid #fa6400"}:{}} key={id}>
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