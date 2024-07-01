import { createDispatcher } from 'redux-dispatcher';
import { CMCMap, Cryptocurrency, CryptoLatestQuote } from '../../../models/Cryptocurrency';

const mapDispatchToAC = {
  fetchMap: () => ({}),
  saveMap: (cmcMaps: CMCMap[]) => ({ cmcMaps }),
  //saveMap: (cmcMap: CMCMap) => ({ cmcMap }),

  fetchMany: ({ offset = 1, limit = CURRENCY_ITEM_PER_PAGE, refresh = false }) => ({
    offset,
    limit,
    refresh,
  }),
  saveList: (currencies: Cryptocurrency[]) => ({ currencies }),

  fetchSpecific: (currencies: Cryptocurrency[], withSearch?: boolean) => ({
    currencies,
    withSearch,
  }),
  updateSpecific: (latestQuotes: CryptoLatestQuote[]) => ({ latestQuotes }),
};

// 1 call credit per 200 cryptocurrencies returned (according to CMC Documentation)
export const CURRENCY_ITEM_PER_PAGE = 200;

export default createDispatcher('crypto', mapDispatchToAC);
