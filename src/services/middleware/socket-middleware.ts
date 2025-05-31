import { RECONNECT_PERIOD } from '@utils/customConfig';
import { refreshToken } from '@services/actionsThunk';
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
						if (withToken && !parseData.success) {
							refreshToken()
								.then((freshData) => {
									// console.log(withToken, parseData);
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										freshData.accessToken.replace('Bearer ', '')
									);
									url = wssUrl.toString();
									dispatch(connect(url));
								})
								.catch((error) => {
									console.log(withToken, parseData);
									dispatch(onError((error as Error).message));
								});
							// console.log(withToken, parseData);
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
			if (sendMessage?.match(action) && socket) {
				try {
					socket?.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}
				return;
			}
			if (disconnect.match(action)) {
				clearTimeout(timeOutId);
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
