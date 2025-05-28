import { RECONNECT_PERIOD } from '@utils/customConfig';
import { api } from '@utils/api';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '@services/store';

export type TwsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	sendMessage?: ActionCreatorWithPayload<S>;
	onMessage: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R, S>(
	wsAction: TwsActions<R, S>,
	withToken = false
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			sendMessage,
			onMessage,
		} = wsAction;
		const { dispatch } = store;
		let isConnected = false;
		let url = '';
		let timeOutId: NodeJS.Timeout;

		return (next) => (action) => {
			if (connect.match(action)) {
				socket = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					onError && dispatch(onError('Ошибка WebSocket.'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());
					if (isConnected) {
						timeOutId = setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parseData = JSON.parse(data);
						if (withToken && parseData.message === 'Invalid or missing token') {
							api
								.refreshToken()
								.then((freshData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										freshData.accessToken.replace('Bearer', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});

							dispatch(disconnect());
							return;
						}
						dispatch(onMessage(parseData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};
				return;
			}
			if (sendMessage?.match(action)) {
				try {
					socket?.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}
				return;
			}
			if (disconnect.match(action)) {
				clearTimeout(timeOutId);
				console.log(action);
				// timeOutId = 0;
				isConnected = false;
				socket?.close();
				socket = null;
				return;
			}

			next(action);
		};
	};
};
