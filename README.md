# bnuz-automatic-frontend

***This application is for learning and reference only, the developer does not bear any risks and responsibilities.***

## Initialize

This Project can't be used directly, you need to modify the following parameters.

- Front End
  - `/src/utils/request.ts`
    - `options.baseURL`
  - `/src/utils/crypto.ts`
    - `key`
    - `iv`
- Back End
  - `/bnuz-automatic-backend/src/utils/rewrite.js`
    - `filePath`
  - `/bnuz-automatic-backend/src/utils/crypto.js`
    - `key`
    - `iv`
  - `/bnuz-automatic-backend/src/route/index.js`
    - `filePath`

## Install Dependencies
```bash
$ npm install # for Frontend
$ cd bnuz-automatic-backend
$ npm install # for Backend
```

## Compiles For Development
```bash
$ npm run serve # Start web application, default run at port 8080
$ cd bnuz-automatic-backend
$ npm start # Start server, default run at port 4001
```

## Compiles For Production
```bash
$ npm run build
```

## PWA
If you want to test PWA you must be in the **production mode** and **run on the server** instead of a local file.
```bash
$ npm run build
```
