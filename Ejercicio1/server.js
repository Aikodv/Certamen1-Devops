const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

let solicitudes = [];

const tiposValidos = [
    "SolicitudCedula",
    "RetiroCedula",
    "SolicitudCertificadoNac",
    "SolicitudCertificadoDef"
];

const esTipoValido = (tipoSolicitud) => {
    return tiposValidos.some(t => t.toLowerCase() === tipoSolicitud.toLowerCase());
};

app.get('/verSolicitudes/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    const filtrados = solicitudes.filter(s => s.tipoSolicitud.toLowerCase() === tipo.toLowerCase());
    res.json(filtrados);
});

app.get('/verSolicitudes', (req, res) => {
    res.json(solicitudes);
});

app.post('/ingresarSolicitud', (req, res) => {
    const solicitud = req.body;

    if (!solicitud.tipoSolicitud || !esTipoValido(solicitud.tipoSolicitud)) {
        return res.status(400).send("Tipo de solicitud no válido");
    }

    solicitudes.push(solicitud);
    res.json(solicitud);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
