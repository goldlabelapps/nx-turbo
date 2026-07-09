import type { T_UbereduxDispatch } from '../../../NX/types';
import { setTheme } from '../../../Leida';

export const initTheme = (config?: any): any =>
	async (dispatch: T_UbereduxDispatch) => {
		const designSystemConfig =
			config?.config?.cartridges?.designSystem ??
			config?.cartridges?.designSystem ??
			config?.features?.designSystem ??
			config?.designSystem;

		dispatch(setTheme('config', designSystemConfig));
		dispatch(setTheme('initted', true));
	};

export default initTheme;
