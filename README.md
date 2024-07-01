# CMC

## Demo recording
https://drive.google.com/file/d/1dvHWEWEGJaRWaIxfk9DI_uIlKZ0vJzcP/view?usp=sharing

## feature highlights
- fetch paginated list, can scroll down to load more, pull up to refresh list
- currency list is updated every 1 second, only visible currencies on the screen is updated to optimize performance
- utilize local cache to display list offline
- can search offline, paired with optimization to detect if the currencies haven't yet fetched to also retrieve data from API
- API request is fine-tuned to retrieve data effectively without overconsuming call credit
- log is available only in development mode, no data leakage

## Requirements
- NodeJS
- Expo

## Install
run command
```
yarn install
```

## Config Env
- register an account at https://pro.coinmarketcap.com/account/ and obtain the API key
- open `.env` file and input your `EXPO_PUBLIC_CMC_API_KEY`

## Run
- iOS: `expo start --ios`
- Android: `expo start --android`

_Notes_: If you change `EXPO_PUBLIC_CMC_API_KEY` then you need to rerun `expo start` and reload the app

