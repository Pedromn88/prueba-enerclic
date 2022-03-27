import axios from 'axios';
import React, { Component } from 'react';
import './style-component.css'

import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import ReactApexChart from 'react-apexcharts';


export const EvoEnergy = () => {
  const [evo, setEvo] = React.useState([])
  const [options, setOptions] = React.useState({})
 
 
   React.useEffect(() => {
     const typeEvo=[]
     const valueEvo=[]
     axios.get(`https://apidatos.ree.es/es/datos/generacion/evolucion-renovable-no-renovable?start_date=2021-01-01T00:00&end_date=2021-12-31T23:59&time_trunc=year
     `)
     .then((rest) => {
         rest.data.included.map(item => {
         typeEvo.push(item.type)
         const max = (item.attributes.values.map((amount) => amount.value))
         for (var i = 0; i < max.length; i++) {
           valueEvo.push(max[i]);
         }
                
         setOptions({
          chart: {
            type: 'bar',
            fontFamily:'Roboto',           
          },
          theme: {
            mode: 'light',  
        },
        colors: ['#208f20', '#0856e7'],
        fill: {          
          opacity: 0.8,
          type: 'solid',     
        },
        tooltip: {
          enabled: false,
        },

        plotOptions: {
          bar: {
            borderRadius: 4,
            barHeight: '100%',
                  distributed: true,
                  horizontal: true,
                  dataLabels: {
                    position: 'bottom'
                  },                
          }
        },
        xaxis: {
          labels: {
            /**
            *
            * @param { String } value - The generated value of the y-axis tick
            */
            formatter: function(val) {
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
          },
          categories: [...typeEvo]
          
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return  opt.w.globals.labels[opt.dataPointIndex] + ":  " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
          },

          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        responsive: [{
          breakpoint: 800,
          options: {
            chart: {
              width: 400,
              fontSize:8
            },

            legend: {
              position: 'bottom'
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
                    distributed: true,
                    horizontal: false,
                    dataLabels: {
                      position: 'bottom'
                    },                
            }
          },
        }],  
     })
        setEvo([{
            name: 'Energía Utilizada',
            data: [...valueEvo]
        }])        
       })  
      })   
   }, []);
 
 
     return (
      <div id="chart">
        <Card sx={{ Width: 650, height:400}} style={{margin: 15}}>
          <CardActionArea>
            <Typography gutterBottom variant="h5" component="div" className="title" style={{margin:15 }}>
              Generación de Energía en España en 2021
              </Typography>
            <CardMedia>
            <ReactApexChart options={options} series={evo} type="bar" width={650} height={300}  />
            </CardMedia>
          </CardActionArea>
        </Card>
  </div>
     )
 }
 
