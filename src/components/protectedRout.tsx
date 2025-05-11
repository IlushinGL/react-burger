import { useSelector } from 'react-redux';
import { selectors } from '@services/selectors';
import { useLocation, Navigate } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';
import Preloader from '@components/preloader/preloader';

const Protected = ({
	onlyUnAuth = false,
	component,
}: {
	onlyUnAuth?: boolean;
	component: any;
}) => {
	const user = useSelector(selectors.currentUser.get_user);
	const isAuth = useSelector(selectors.currentUser.isAuth);
	const location = useLocation();

	if (!isAuth) {
		return <Preloader box={160} visible={true} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to={APP_PATH.login} state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: APP_PATH.home } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: any }) => (
	<Protected onlyUnAuth component={component} />
);
