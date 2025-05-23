export type TAnsNewOrder = {
	name: string;
	order: {
		number: number;
	};
	success: true;
};

export type TOrderCard = {
	_id: string;
	number: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	ingredients: string[];
};

export type TOrders = {
	orders: TOrderCard[];
	total: number;
	totalToday: number;
};

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type TIngredientWithCount = TIngredient & { count: number };
export type TIngredientLink = {
	key: string;
	id: string;
};
export type TAnsIngrediets = {
	data: TIngredient[];
	success: true;
};

type TUser = {
	name: string;
	email: string;
	password: string;
	code: string;
};
export type TUserData = Pick<TUser, 'name' | 'email'>;

export type TUserReg = Omit<TUser, 'code'>;
export type TUserLogIn = Omit<TUser, 'name' | 'code'>;
export type TUserEmail = Pick<TUser, 'email'>;
export type TUserConfirm = Pick<TUser, 'password' | 'code'>;

type TAnswer = {
	success: boolean;
	message: string;
	user: TUserData;
	accessToken: string;
	refreshToken: string;
};

export type TAnsInfo = Pick<TAnswer, 'success' | 'message'>;
export type TAnsAuth = Omit<TAnswer, 'message'>;
export type TAnsToken = Omit<TAnswer, 'user' | 'message'>;
export type TAnsUser = Pick<TAnswer, 'success' | 'user'>;
