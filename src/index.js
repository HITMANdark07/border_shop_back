import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { CLIENT_ORIGIN } from './constants.js';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
    credentials: true,
    origin:CLIENT_ORIGIN.split(","),
  };
app.use(cors(corsOptions));

// import routes
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

// using routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('listening on PORT:',PORT);
});