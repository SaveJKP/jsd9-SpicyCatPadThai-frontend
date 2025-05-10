import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {   Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue, } from "@/components/ui/select";


const Dropdown = ({ apiUrl, value, onChange, label, name, disabled }) => {
    const [options, setOptions] = useState([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  
    useEffect(() => {
      const fetchOptions = async () => {
        if (!apiUrl) {
          setOptions([]);
          setIsLoadingOptions(false);
          return;
        }
        setIsLoadingOptions(true);
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // Sort the options alphabetically by name 
          const sortedOptions = response.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setOptions(sortedOptions);
          // setOptions(response.data)
        } catch (error) {
          console.error(`Error fetching ${label} options:`, error);
          setOptions([]);
        } finally {
          setIsLoadingOptions(false);
        }
      };

      fetchOptions();
    }, [apiUrl, label]);
  
    return (
      <div className="space-y-1">
        <label htmlFor={name} className="text-sm font-semibold">
          {label}
        </label>
        <Select value={value} onValueChange={onChange} disabled={disabled || isLoadingOptions}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {isLoadingOptions ? 
            (
              <SelectItem disabled>Loading options...</SelectItem>
            ) :  (
              options.map((option) => (
                <SelectItem key={option._id} value={option._id}>
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