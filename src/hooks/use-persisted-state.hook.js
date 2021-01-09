import { useEffect, useState } from 'react';

const usePersistedState = (defaultValue, key) => {
    const [value, setValue] = useState(
        () => {
            const checkLocalStorage = JSON.parse(localStorage.getItem(key));
            return checkLocalStorage !== null ? checkLocalStorage : defaultValue;
        })
    
    useEffect(() => {
        const stringifyedValue = JSON.stringify(value);
        localStorage.setItem(key, stringifyedValue);
    },[value, key])

    return [value, setValue];
}

export default usePersistedState;