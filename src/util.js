import React from 'react'
import {Circle,Popup} from 'react-leaflet'
import numeral from 'numeral'


const casesTypeColors={
    cases:{
        
        
        multipliear:150,
    },
    recovered:{
        
       
        multipliear:200,
    },
    deaths:{
        
        
        multipliear:600,
    },
};
export const prettyPrint=(stat)=>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0"

export const sortData = (data)=>{
    const sortedData=[...data]
    return sortedData.sort((a,b)=>(a.cases>b.cases?-1:1))
}
export const showDataOnMap=(data,casesType)=>(
    data.map(country=>(
        <Circle 
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color="#c94528"
        
        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multipliear 
        }
        >
    <Popup>
        <div className="info-container">
            <div className="info-flag"
             style={{backgroundImage:`url(${country.countryInfo.flag})`}} />
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
            <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div> 
        </div>
    </Popup>
        </Circle>
    )) 
)