// Import thư viện Express
const express = require('express');

const database= require("./config/database")
require('dotenv').config();
const systemConfig=require("./config/system")
const PORT = process.env.PORT; // Đọc cổng từ file .env
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
database.connect();
// Khởi tạo một ứng dụng Express
const app = express();
// app Locals Variable 
app.locals.prefixAdmin=systemConfig.prefixAdmin;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
// Route
route(app);
routeAdmin(app);
// Khởi chạy máy chủ và lắng nghe yêu cầu trên cổng
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
