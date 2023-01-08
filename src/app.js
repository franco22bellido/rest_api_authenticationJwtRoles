import express from 'express';
import productRoutes from './routes/product.route.js'
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/user.route.js';
import morgan from 'morgan';
import {createRoles} from './libs/roles.js';
//import pkg from '../package.json'

const app = express();
createRoles();

//app.set('pkg', pkg)
app.use(express.json());
app.use(morgan('dev'));


// app.get('/', (req, res)=>{
    //     res.json({
        //         name: app.get('pkg').name,
        //         author: app.get('pkg').author,
//         description: app.get('pkg').description,
//         version: app.get('pkg').version
//     });

// });

app.use('/api/product',productRoutes);
app.use('/api/auth', authRoutes);
app.use('/', adminRoutes);
export default app;