import React from "react";

import './styles.css'

import { EvoEnergy } from "../component/evo-energy";
import { Generation } from "../component/generation";
import { Emissions } from "../component/emisiones";
import { Header } from "../layout/header";
import { Footer } from "../layout/footer";

  
  export const Home = () => {
   
    return (
           
   <> 
   <Header />
   
 <div className="container">
     <h1>Datos Energia España</h1>
     <div className="column-1">
 <EvoEnergy />
 <Generation />
    </div>
  <Emissions />
  <Footer />
  </div>
  </>  
  
    );
  
  }