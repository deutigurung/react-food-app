import './App.css';
import HomePage from './pages/homepage';
import ThemeButton from './components/theme-button';
import { createContext, useState } from 'react';

/*
-context is basically a global way of passing data between components without props
-context need to be root component
-working with context
1. create context object
2. provide context object
3. consume context object
*/
//create context
export const ThemeContext  = createContext(null);

function App() {

    const [theme,setTheme] = useState(false);
     return (
        //provide context object value for theme
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }} >
        <div className='App' style={theme ? {backgroundColor: '#2c7dfa'} : {}}>
            <ThemeButton/>
            <HomePage />
        </div>
        </ThemeContext.Provider>
     );
}

export default App;

