import type { T_UbereduxDispatch } from '../../../NX/types';
import { setLayout } from '../../../Leida';

export const initLayout = (): any =>
    async (dispatch: T_UbereduxDispatch) => {
        dispatch(setLayout('initted', true));
        dispatch(setLayout('isLoading', true));
        dispatch(setLayout('loadingText', 'Welcome, Practitioner.'));
    };

export default initLayout;
