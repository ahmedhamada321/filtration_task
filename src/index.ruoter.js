import { globalErrorHandling } from "./helper/index.js";
import connectToDataBase from "./connection/database.js";
import prodctRoutr from "./modules/product/product,routes.js";
import orderRoutr from "./modules/order/order.routes.js";

const applyMiddlewares = (app, express) => {
  app.use(express.json());

  app.use("/api", prodctRoutr);
  app.use("/api", orderRoutr);

  app.all("*", (req, res, next) => {
    const err = new Error(`Can't find this route ${req.originalUrl}`);
    next(err);
  });

  app.use(globalErrorHandling);
};

export const bootStrap = async (app, express) => {
  await connectToDataBase();
  applyMiddlewares(app, express);
};
