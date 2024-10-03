import React, { useState, useEffect, useRef } from 'react';

const AutoFilterDropdown = ({ ItemsList, labelKey, reset, valueChange }) => {
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const handleFilterChange = (event) => {
    const inputValue = event.target.value;
    
    if (selectedItem) {
      setSelectedItem(null);
      valueChange(null); 
    }

    setFilterText(inputValue);
    setIsOpen(true);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setFilterText(''); 
    setIsOpen(false); 
    valueChange(item); 
  };

  const handleClearSelection = () => {
    setSelectedItem(null); 
    setFilterText(''); 
    setIsOpen(false); 
    valueChange(null); 
  };

  const filteredItems = ItemsList.filter((item) =>
    item[labelKey].toLowerCase().includes(filterText.toLowerCase())
  );

  const resetDropdown = () => {
    setSelectedItem(null);
    setFilterText('');
    setIsOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (reset) {
      resetDropdown();
    }
  }, [reset]);

  return (
    <div ref={dropdownRef}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={selectedItem ? selectedItem[labelKey] : filterText}
          onChange={handleFilterChange}
          placeholder={`Search for your item...`}
          onFocus={() => setIsOpen(true)}
        />
        {selectedItem && (
          <button onClick={handleClearSelection} style={{ position: 'absolute', right: '5px' }}>
            &times; {/* Clear button */}
          </button>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item)}
              className="dropdown-item"
            >
              {item[labelKey].split(new RegExp(`(${filterText})`, 'i')).map((part, i) =>
                part.toLowerCase() === filterText.toLowerCase() ? (
                  <strong key={i}>{part}</strong>
                ) : (
                  part
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoFilterDropdown;
