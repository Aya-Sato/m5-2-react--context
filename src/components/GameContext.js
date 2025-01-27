import React, { createContext } from 'react';

import usePersistedState from '../hooks/use-persisted-state.hook';
import items from './Data';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState(1000, 'num-cookies');

    const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    }, 'purchasedItems');

    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find((item) => item.id === itemId);
            const value = item.value;

            return acc + value * numOwned;
        }, 0);
    };

    const cookiesPerSecond = calculateCookiesPerSecond(purchasedItems);

    return <GameContext.Provider value={{ numCookies, setNumCookies, purchasedItems, setPurchasedItems, cookiesPerSecond }}>{children}</GameContext.Provider>;
};