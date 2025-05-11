import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app';
import { Provider } from 'react-redux';
import { store } from '@services/store';
import './styles.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</StrictMode>
);
