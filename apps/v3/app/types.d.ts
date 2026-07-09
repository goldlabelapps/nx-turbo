declare module '*.css';

export type T_LeidaProps = {
	config?: any;
};

export type ThemeProps = {
	children?: import('react').ReactNode;
};

export type RoutinePeriod = 'am' | 'pm';

export type RoutineProduct = {
	id: string;
	name: string;
	shortName: string;
	imageSrc: string;
	brand: string;
	category: string;
	price: string;
	size: string;
	tag?: string;
	whyInRoutine: string;
	howToUse: string;
	note: string;
};

export type RoutineStage = {
	stage: string;
	am: string | null;
	pm: string | null;
};

export type ProductRoutineCardProps = {
	product: RoutineProduct;
	stepNumber: number;
};

export type LeidaRoutePath = '/' | '/theme' | '/routines' | '/products' | '/clients';

export type T_LeidaNavigationItem = {
	path: LeidaRoutePath;
	label: string;
};

export type T_LeidaNavigationProps = {
	currentPath: LeidaRoutePath;
	onNavigate: (path: LeidaRoutePath) => void;
};

export type T_HeaderProps = T_LeidaNavigationProps;

export type T_FooterProps = T_LeidaNavigationProps;

export type EmailFormState = {
	toName: string;
	toEmail: string;
	subject: string;
	body: string;
};

export type T_EmailClientPayload = {
	toName: string;
	toEmail: string;
	subject: string;
	body: string;
	template?: 'basicEmailTemplate';
};

export type T_EmailClientResponse = {
	meta?: {
		message?: string;
	};
	data?: any;
};

export type WrapperProps = {
	children?: import('react').ReactNode;
};