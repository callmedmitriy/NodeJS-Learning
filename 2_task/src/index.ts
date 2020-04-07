import express from 'express';

import { Routes } from './types/Routes';

import { router } from './api';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(Routes.USERS, router);

app.listen(PORT, () => {

    // eslint-disable-next-line no-console
    console.log(`Server started at http://localhost:${PORT}`);

});
