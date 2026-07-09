import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUI } from '../../../NX';

export const initUI = (): any =>
    async (dispatch: T_UbereduxDispatch) => {
        dispatch(setUI('initted', true));
    };

export default initUI;
