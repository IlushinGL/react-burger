import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app';
import { Provider } from 'react-redux';
import { store } from '@services/store';
import './styles.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
