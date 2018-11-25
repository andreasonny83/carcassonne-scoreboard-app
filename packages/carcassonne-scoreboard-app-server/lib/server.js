"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 8888;
// const status = (req, res) => {
//   res.status(200).send({
//     status: 'ok',
//   });
// };
// app.use('/status', status);
// app.use('/register', register);
// app.use('/login', login);
const server = app_1.app.listen(PORT, () => {
    // console.log(`Server listening on http://localhost:${server.address().port}`);
    console.log(`Server listening on http://localhost:${PORT}`);
});
