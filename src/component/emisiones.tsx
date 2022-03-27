import React, { Component } from 'react';
import axios from 'axios';

import './style-component.css';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import ReactApexChart from 'react-apexcharts';


export const Emissions = () => {
  const [emissions, setEmissions] = React.useState([])
  const [energy, setEnergy] = React.useState({})
 
 
   React.useEffect(() => {
     const typeEnergy=[]
     const emissionsEnergy=[]
     axios.get(`https://apidatos.ree.es/es/datos/generacion/no-renovables-detalle-emisiones-CO2?start_date=2021-01-01T00:00&end_date=2021-12-31T23:59&time_trunc=year`)
     .then((rest) => {
         rest.data.included.map(item => {
         typeEnergy.push(item.type)
         const max = (item.attributes.values.map((amount) => amount.value))
         for (var i = 0; i < max.length; i++) {
          emissionsEnergy.push(max[i]);
          
           }
 
        setEnergy({
           chart: {
             type: 'area',
             fontFamily:'Roboto',
             fontWeight: 600,
           },
           labels: [ ...typeEnergy ],
           responsive: [{
            breakpoint: 1080,
            options: {
              chart: {
                width: 350  
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          yaxis: {
            labels: {
              formatter: function (val, opt) {
            return  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
              },
            }
          },  
      })
        setEmissions([{
          name: 'Emisiones de CO2 según el tipo de energía',
          data: [...emissionsEnergy]
        }])
  })  
})

     
   }, []);
 
 
 
     return (
       <div id="chart">
        <Card sx={{ maxWidth: 1280}} style={{margin: 30}} >
          <CardActionArea>
            <Typography gutterBottom variant="h5" component="div" className="title" style={{marginTop:30, marginBottom:30}}>
              Emisiones de C02 energías no renovables
            </Typography>
            <CardMedia >
              <ReactApexChart options={energy} series={emissions} type="area" class="table-emissions" width={1280} height={350} />
            </CardMedia>
          </CardActionArea>
        </Card>
      </div>
     )
 }
   
