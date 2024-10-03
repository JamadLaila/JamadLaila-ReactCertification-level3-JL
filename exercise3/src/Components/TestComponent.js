import React, { useState, useEffect } from 'react';
import AutoFilterDropdown from './AutoFilterDropdown';
import '../CSS/Style.css'; 

const TestComponent = () => {
  const [users, setUsers] = useState([]);
  const [resetDropdown, setResetDropdown] = useState(false);

  const countries = [
    { name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { name: 'Morocco', cities: ['Agadir', 'Rabat', 'Casablanca'] },
    { name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { name: 'United Kingdom', cities: ['London', 'Birmingham', 'Manchester'] },
    { name: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  const handleUserValueChange = (user) => {
    setSelectedUser(user);
  };

  const handleCountryValueChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); 
    setResetDropdown(false);
  };

  const handleCityValueChange = (city) => {
    setSelectedCity(city);
  };

  const resetSelections = () => {
    setResetDropdown(true);
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedUser(null);
  };

  return (
    <div className="container">
      <h1>Exercise 3 - Auto-Filter Dropdown Test</h1>

      <div className="dropdown-container">
        <h2>1. User List Example - Using API</h2>
        <AutoFilterDropdown
          ItemsList={users}
          labelKey="name"
          valueChange={handleUserValueChange}
          reset={resetDropdown} // Pass reset state
        />
        {selectedUser && (
       <div>
          <p>
            Selected User from API: <strong>{selectedUser.name}</strong>
          </p>
          <p>
            Name: <strong>{selectedUser.name}</strong>
          </p>
          <p> 
            Email: <strong>{selectedUser.email}</strong>
          </p>
        </div>
      )}
      </div>

      <div className="dropdown-container">
        <h2>2. Country List Example - with asubDropdown for Cities</h2>
        <AutoFilterDropdown
          ItemsList={countries}
          labelKey="name"
          valueChange={handleCountryValueChange}
          reset={resetDropdown} // Pass reset state
        />
        {selectedCountry && (
          <div>
            <p className="selected-item">
              Selected Country: <strong>{selectedCountry.name}</strong>
            </p>

            <h3>Cities in {selectedCountry.name}</h3>
            <AutoFilterDropdown
              ItemsList={selectedCountry.cities.map((city) => ({ name: city }))}
              labelKey="name"
              valueChange={handleCityValueChange}
              reset={resetDropdown} // Pass reset state
            />
            {selectedCity && (
              <p className="selected-item">
                Selected City: <strong>{selectedCity.name}</strong>
              </p>
            )}
          </div>
        )}
      </div>
      <div>
      {/* Reset Button */}
      <button className="reset-button" onClick={resetSelections}>
        Reset Selections
      </button>
      </div>
    </div>
  );
};

export default TestComponent;
