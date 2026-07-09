import type { T_UbereduxDispatch } from '../../../NX/types';
import { setProducts } from '../../../Leida';

export const initProducts = (): any =>
    async (dispatch: T_UbereduxDispatch) => {
        dispatch(setProducts('initted', true));
    };

export default initProducts;
