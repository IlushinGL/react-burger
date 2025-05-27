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
	wsAction: TwsActions<R, S>
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
		return (next) => (action) => {
			if (connect.match(action)) {
				socket = new WebSocket(action.payload);
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					onError && dispatch(onError('Ошибка WebSocket.'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());
				};
				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parseData = JSON.parse(data);
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
			if (disconnect?.match(action)) {
				socket?.close();
				socket = null;
				return;
			}

			next(action);
		};
	};
};
