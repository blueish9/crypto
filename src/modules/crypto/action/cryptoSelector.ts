import { ReduxSlices } from '../../../store/rootReducer';

export const selectCrypto = (state: ReduxSlices) => state.crypto;
