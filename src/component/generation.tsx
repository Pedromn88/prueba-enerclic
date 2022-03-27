import React, { Component } from 'react';
import axios from 'axios';
import './style-component.css'

import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import ReactApexChart from 'react-apexcharts';


export const Generation = () => {
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
            fontFamily:'Roboto'
          },
          theme: {
            mode: 'light', 
            palette: 'palette6',            
        },
        fill: {          
      opacity: 1,
      type: 'solid',
        },
        dataLabels: {
          style: {
            colors: [ '#dddddd']
          }
        },
        tooltip: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontFamily: 'roboto'
          },
          labels: {
            /**
            * @param { String } val - The generated value of the y-axis tick
            */
            formatter: function(val) {
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
          },
        },
          labels: [ ...typeEnergy ],
          responsive: [{
            breakpoint: 800,
            options: {
              chart: {
                width: 320
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
    <div id="chart generate-chart">
      <Card sx={{Width: 650 , height:400 }} style={{margin:15  }}>
        <CardActionArea>
          <Typography gutterBottom variant="h5" component="div" className="title" style={{margin:15 }}>
            Generación de Energía en España en 2021
          </Typography>
          <CardMedia>
            <ReactApexChart options={options} series={generate} type="donut" width={650} height={300} style={{ paddingLeft:30, paddingRight:30 }} />
          </CardMedia>
        </CardActionArea>
      </Card>
    </div>
 
  )
}

