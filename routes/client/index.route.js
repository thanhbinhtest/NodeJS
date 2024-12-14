const productsRoutes= require("./products.route");
const productsHome= require("./home.route");
module.exports =(app) =>{
    app.use("/", productsHome);
    
    app.use("/products",productsRoutes)
 
  }