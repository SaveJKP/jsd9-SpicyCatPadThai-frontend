import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {   Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue, } from "@/components/ui/select";


const Dropdown = ({ apiUrl, value, onChange, label, name }) => {
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setOptions(response.data); // Assuming the API returns an array of objects { id, name }
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      };
  
      fetchOptions();
    }, [apiUrl]);
  
    return (
      <div className="space-y-1">
        <label htmlFor={name} className="text-sm font-semibold">
          {label}
        </label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.length === 0 ? (
              <SelectItem disabled>No options available</SelectItem>
            ) : (
              options.map((option) => (
                <SelectItem key={option.id} value={option.name}>
                  {option.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  export default Dropdown;