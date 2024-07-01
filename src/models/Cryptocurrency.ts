export type Cryptocurrency = {
  id: number;
  name: string;
  symbol: string;
  price: string;
  quote: {
    USD?: {
      price: number;
      percent_change_1h: number;
    };
  };
};

/*export type CMCMap = {
  symbol: Record<string, number>;
  name: Record<string, number>;
};*/

export type CMCMap = {
  id: number;
  name: string;
  symbol: string;
};

export type CryptoLatestQuote = Record<string, Cryptocurrency>;

const COIN_MARKET_CAP_API_KEY = '75d4204d-f286-47f5-80a8-305444cfe1b3';
