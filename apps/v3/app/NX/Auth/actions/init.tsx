import type { T_UbereduxDispatch } from '../../../NX/types';
import { setAuth } from '../../../NX';

export const initAuth = (): any =>
	async (dispatch: T_UbereduxDispatch) => {
		dispatch(setAuth('initted', true));
	};

export default initAuth;
