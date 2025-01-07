import React, { createContext, useContext, useState } from 'react';
import Spinner from '../components/Spinner';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
        {loading && <Spinner />} {/* Full-page spinner */}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
