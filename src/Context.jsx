import React,  { createContext, useState } from "react";

export const CRUDContext = createContext()
export const CRUDProvider = ({children}) => {
    
const [datos,setDatos] = useState([])


    return(
        <CRUDContext.Provider value={{
         datos
        }}>
            {children}
        </CRUDContext.Provider>
    )
}