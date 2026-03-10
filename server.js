// server.js
const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const nodeRoutes = require('./routes/nodeRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
// Middleware
app.use(cors());
app.use(express.json());
// Rutas
app.use('/api/countries', countryRoutes);
app.use('/api/nodes', nodeRoutes);
// Ruta de inicio
app.get('/'
    , (req, res) => {
        res.send('API de Países funcionando correctamente');
    });
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});