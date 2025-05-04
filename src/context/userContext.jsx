import React, {createContext, useState, useEffect, useContext } from "react";

export const userContext = createContext();

export const UserProvider = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await axios.get('');
                setUser(response.data.user);
            } catch (err) {
                console.error(err);
                setUser(null);
            }
        }
        fetchUser();
    }, []);
}
