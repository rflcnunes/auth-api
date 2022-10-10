import express from 'express';
import * as db from './src/config/initialDb.js';
import * as dotenv from 'dotenv';
import userRoutes from './src/modules/user/routes/UserRoutes.js';
import checkToken from './src/config/auth/checkToken.js';

const app = express();
const env = dotenv.config().parsed;
const PORT = env.PORT || 8080;

db.createInitialData();

app.use(express.json());
app.use(userRoutes);
app.use(checkToken);

app.get('/api/status', (req, res) => {
    return res.status(200).json({ 
        service: "Auth API",
        status: "OK",
        httpStatus: 200
     });
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);  
});