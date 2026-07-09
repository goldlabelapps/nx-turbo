import type { T_UbereduxDispatch } from '../../../NX/types';
import { fetchClients, setClients } from '../../../Leida';

export const initClients = (): any =>
    async (dispatch: T_UbereduxDispatch) => {
        await dispatch(fetchClients());
        dispatch(setClients('initted', true));
    };

export default initClients;
