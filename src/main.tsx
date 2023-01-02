import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import theme from './config/theme';
import ScrollToTop from './layout/ScrollToTop';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ChakraProvider theme={theme}>
        <HashRouter>
            <Provider store={store}>
                <ScrollToTop />
                <App />
            </Provider>
        </HashRouter>
    </ChakraProvider>
);
