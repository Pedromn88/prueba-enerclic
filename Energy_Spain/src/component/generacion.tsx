import axios from 'axios';
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import './style-component.css'

      
      

export const Generacion = () => {
 const [generate, setGenerate] = React.useState([])
 const [options, setOptions] = React.useState({})


  React.useEffect(() => {
    const typeEnergy=[]
    const valueEnergy=[]
    axios.get(`https://apidatos.ree.es/es/datos/generacion/estructura-generacion?start_date=2021-01-01T00:00&end_date=2021-12-31T23:59&time_trunc=year`)
    .then((rest) => {
        rest.data.included.map(item => {
        typeEnergy.push(item.type)
        const max = (item.attributes.values.map((valores) => valores.value))
        for (var i = 0; i < max.length; i++) {
          valueEnergy.push(max[i]);
        }
        
       setOptions({
          chart: {
            type: 'donut',
          },
          theme: {
            mode: 'light', 
            palette: 'palette7', 
            
        },
        fill: {
          
      opacity: 0.8,
      type: 'solid',
      gradient: {
        shade: 'dark',
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: []
      },
      
        },

        dataLabels: {
          style: {
            colors: [ '#2c292c']
          }
        },


          labels: [ ...typeEnergy ],
          responsive: [{
            breakpoint: 800,
            options: {
              chart: {
                width: 500
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        ,
     })
       setGenerate([ ...valueEnergy])
      })  
      })
    
  }, []);



    return (
      <div id="chart">
      <h2 className="title">Generación de Energía en España en 2021</h2> 
        <ReactApexChart options={options} series={generate} type="donut" width={600} height={600} />
      </div>
 
    )
}

