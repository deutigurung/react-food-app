
import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const ThemeButton = () => {
    //consume the context using useContext hook and return a reference to the context object
    const { theme,setTheme} = useContext(ThemeContext);
    // console.log(theme,setTheme)
    //toggle setTheme when theme is true and setTheme is false
    return(
        <button onClick={()=>setTheme(!theme)} className="theme-button">
            Change Theme
        </button>
    );
}

export default ThemeButton;