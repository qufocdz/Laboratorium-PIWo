import { createContext, useReducer, useEffect } from "react";

const STORAGE_KEY = 'letbook-basket';

const initState = [];

const saveToStorage = (state) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving basket to localStorage:', error);
        }
    }
};

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                newState = state.map(item => 
                    item.id === action.payload.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newState = [...state, { ...action.payload, quantity: 1 }];
            }
            break;
        case 'REMOVE_ITEM':
            const itemToRemove = state.find(item => item.id === action.payload.id);
            if (itemToRemove && itemToRemove.quantity > 1) {
                newState = state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                newState = state.filter(item => item.id !== action.payload.id);
            }
            break;
        case 'REMOVE_ALL_OF_ITEM':
            newState = state.filter(item => item.id !== action.payload.id);
            break;
        case 'LOAD_FROM_STORAGE':
            newState = action.payload;
            break;
        default:
            return state;
    }
    
    saveToStorage(newState);
    return newState;
}

const BasketBooksContext = createContext();

export const BasketBooksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(saved) });
                }
            } catch (error) {
                console.error('Error loading basket from localStorage:', error);
            }
        }
    }, []);

    return (
        <BasketBooksContext.Provider value={{ state, dispatch }}>
            {children}
        </BasketBooksContext.Provider>
    );
}

export default BasketBooksContext;