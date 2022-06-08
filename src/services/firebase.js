import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
// import { Provider as ReduxProvider } from "react-redux";
// import configureStore from './redux/store';
import AppNavigation from '../navigation/AppNavigation';

// const store = configureStore();

const Routes = () => {
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        // <ReduxProvider store={store}>
        <AppNavigation />
        // </ReduxProvider>
    );
};

export default Routes;