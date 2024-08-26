import {useContext, createContext, useState, useEffect} from "react"

const ThemeContext= createContext()

export const useTheme=()=>{
    return useContext(ThemeContext)
}

export const ThemeProvider = ({children})=>{
    const [isDarkMode, setIsDarkMode] = useState(false)

    const theme = isDarkMode ? "dark" : "light"

    const toggleTheme = ()=>{
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
      document.documentElement.setAttribute("data-theme",theme)
    }, [isDarkMode])
    

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}