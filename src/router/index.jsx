
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Components/NavBar/Navbar";
import Login from "../Components/Login";
import Usuarios from "../Usuarios";
import Clientes from "../Clientes";
import Home from "../Components/Home";
import Notas from "../Components/Notas";


const Rutas = () => {
  
  return (
    <>

      <BrowserRouter>
      <Navbar/>
          
          <Routes>
          <Route path="/home" element={<Home/>}/>
            
            <Route path="/login" element={<Login/>}/>
            <Route path="/user" element={<Usuarios/>}/>
            <Route path="/client" element={<Clientes/>}/>
            <Route path="/notas" element={<Notas/>}/>

          </Routes>
      </BrowserRouter>
    </>
  );
};
export default Rutas;
