
import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const ThemeButton = () => {
    //consume the context using useContext hook and return a reference to the context object
    const { theme,setTheme} = useContext(ThemeContext);
    // console.log(theme,setTheme)
    //toggle setTheme and change theme bg if it is true
    return(
        <button style={theme ? {backgroundColor: '#12343b'}: {}} onClick={()=>setTheme(!theme)} className="theme-button">
            Change Theme
        </button>
    );
}

export default ThemeButton;