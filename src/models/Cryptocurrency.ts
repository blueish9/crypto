export type Cryptocurrency = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD?: {
      price: number;
      percent_change_1h: number;
    };
  };
};

export type CMCMap = Partial<Cryptocurrency> & {
  id: number;
  name: string;
  symbol: string;
};

export type CryptoLatestQuote = Record<string, Cryptocurrency>;
