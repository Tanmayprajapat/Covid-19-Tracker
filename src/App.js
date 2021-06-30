import './App.css';
import React, { useState, useEffect } from 'react'
import {  FormControl, MenuItem, Select,Card,CardContent } from "@material-ui/core"
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table';
import {sortData,prettyPrint} from './util'
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo]=useState({})
  const [tableData,setTableData]=useState([])
  const [mapCenter,setMapCenter]=useState([30.0,40.0])
  const [mapZoom,setMapZoom]=useState(2)
  const [mapCountries,setMapCountries]=useState([])
  const [casesType,setCasesType]=useState("cases")

  useEffect(()=>{
      const url= "https://disease.sh/v3/covid-19/all"
       fetch(url)
      .then(response=>response.json())
      .then(data=>{
        setCountryInfo(data)
      })
  },[])
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const c = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData=sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(c)

        })
    }
    getCountriesData();
  }, [])
  const onCountryChange=async (e)=>{
    const countryCode=e.target.value;
    setCountry(countryCode)
    const url= countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${e.target.value}`
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data)
      setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      
      setMapZoom(13)
      
    })
  }
  
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>COVID-19 TRACKER</h2>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide </MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox isRed active={casesType==="cases"} onClick={(e)=>setCasesType('cases')} title="Cases" cases={prettyPrint(countryInfo.todayCases)} total={prettyPrint(countryInfo.cases)} />
          <InfoBox isGreen active={casesType==="recovered"} onClick={(e)=>setCasesType('recovered')} title="Recovered" cases={prettyPrint(countryInfo.todayRecovered)} total={prettyPrint(countryInfo.recovered)} />
          <InfoBox isRed active={casesType==="deaths"} onClick={(e)=>setCasesType('deaths')} title="Deaths" cases={prettyPrint(countryInfo.todayDeaths)} total={prettyPrint(countryInfo.deaths)} />
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
        <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
