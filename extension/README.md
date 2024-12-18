# BNB Pass Extension

Extension to Get Your Credentials stored using BNB Pass.

## About BNB Pass

users can securely save/access their password, username to access any application on internet. No need to worry about credentials theft or to forget them, now you can secure your hundreds of username and password with your own wallet private key, you would have 100 % control of it

## Tech Stack

- TypeScript
- React
- Tailwind
- MUI
- crypto-js
- ethers.js
- React Query
- metamask-extension-provider

## Local Development

To run extension locally, you will need

- Node.js (v18 or above)
- Chrome Browser Or Chromium based browser
- Metamask Extension on Chrome Browser (Chromium based browser)

1. clone this repo

```
git clone https://github.com/rahulEth/bnbpass.git
```

2. go to extension folder

```
cd extension
```

3. build extension

```
npm run build
```

4. After Completing the build you can load that build (/dist folder) to Chrome Extension

   Follow this link: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

5. go to api folder

```
cd .. && cd api
```

6. run api server to connect with local Back-end server

```
npm start
```

Ta-da You are good to go and explore BNB pass Extension!
