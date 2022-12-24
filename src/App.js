import axios from "axios"
import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [country, setCountry] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [filterType, setFilterType] = useState("name")

  const countryGet = () => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountry(response.data)
      setSearchedCountries(response.data)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      countryGet()
    }, 0)
  }, [])

  function searchCountry(event) {
    const eventString = event.target.value
    const convertNumber = eventString.split(" ").filter(function (n) {
      return n !== ""
    }).length
    if (convertNumber === 0) {
      setTimeout(() => {
        setCountry(country)
      }, 50)
    } else if (filterType === "capital") {
      const filtered = searchedCountries?.filter((country) => {
        return country.capital
          ?.toLowerCase()
          .includes(eventString?.toLowerCase())
      })
      setCountry(filtered)
    } else if (filterType === "name") {
      const filtered = searchedCountries?.filter((country) => {
        return country.name?.toLowerCase().includes(eventString?.toLowerCase())
      })
      setCountry(filtered)
    } else if (filterType === "region") {
      const filtered = searchedCountries?.filter((country) => {
        return country.region
          ?.toLowerCase()
          .includes(eventString?.toLowerCase())
      })
      setCountry(filtered)
    }
  }

  function reset() {
    setTimeout(() => {
      setCountry(country)
    }, 50)
  }

  return (
    <div className='App'>
      <h2 style={{ marginTop: "20px" }} className='text-center'>
        Search
      </h2>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
        }}
        className='d-flex input-group w-auto'
      >
        <input
          style={{
            margin: "2px",
            padding: "20px",
            maxWidth: "400px",
            fontSize: "18px",
            textAlign: "center",
          }}
          type='input'
          className='form-control'
          placeholder='Search Name...'
          onChange={searchCountry}
          onClick={(e) => setFilterType("name")}
        />
        <input
          style={{
            margin: "2px",
            padding: "20px",
            maxWidth: "400px",
            fontSize: "18px",
            textAlign: "center",
          }}
          type='input'
          className='form-control'
          placeholder='Search Capital...'
          onChange={searchCountry}
          onClick={(e) => setFilterType("capital")}
        />
        <input
          style={{
            margin: "2px",
            padding: "20px",
            maxWidth: "400px",
            fontSize: "18px",
            textAlign: "center",
          }}
          type='input'
          className='form-control'
          placeholder='Search Region...'
          onChange={searchCountry}
          onClick={(e) => setFilterType("region")}
        />

        <button class='bg-warning' onClick={(e) => reset()}>
          Reset
        </button>
        <div style={{ marginTop: "100px" }}>
          <h2 className='text-center'>COUNTRY APP </h2>
          <div>
            <table class='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Capital</th>
                  <th scope='col'>Region</th>
                  <th scope='col'>Flag</th>
                  <th scope='col'>Population</th>
                </tr>
              </thead>

              <tbody>
                {country?.map((value) => {
                  return (
                    <tr>
                      <td>{value.name}</td>
                      <td>{value.capital}</td>
                      <td>{value.region}</td>
                      <td>
                        <img
                          src={value.flag}
                          alt={value.name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{(value.population / 1000000).toFixed(1)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App
