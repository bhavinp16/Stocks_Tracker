import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserState from './Context/User/UserState';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
	<React.StrictMode>
		<ToastProvider>
			<UserState >
				<App />
			</UserState>
		</ToastProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
