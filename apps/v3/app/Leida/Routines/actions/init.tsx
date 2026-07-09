import type { T_UbereduxDispatch } from '../../../NX/types';
import { setRoutines } from '../../../Leida';

export const initRoutines = (): any =>
    async (dispatch: T_UbereduxDispatch) => {
        dispatch(setRoutines('initted', true));
    };

export default initRoutines;
