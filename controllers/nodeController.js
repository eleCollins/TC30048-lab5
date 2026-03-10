const pool = require('../db');
const { randomUUID } = require('crypto');

// Obtener todos los nodos
exports.getAllNodes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `node` ORDER BY createdAt');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los nodos:', error);
        res.status(500).json({ error: 'Error al obtener los nodos', detail: error.message });
    }
};

// Obtener un nodo por ID
exports.getNodeById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `node` WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nodo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el nodo:', error);
        res.status(500).json({ error: 'Error al obtener el nodo' });
    }
};

// Crear un nuevo nodo
exports.createNode = async (req, res) => {
    const { workflowId, type, name, description, configuration, positionX, positionY } = req.body;

    if (!workflowId || !type || !name || positionX == null || positionY == null) {
        return res.status(400).json({ error: 'workflowId, type, name, positionX y positionY son obligatorios' });
    }

    const id = randomUUID();
    const configJson = configuration ? JSON.stringify(configuration) : null;

    try {
        await pool.query(
            'INSERT INTO `node` (id, workflowId, type, name, description, configuration, positionX, positionY) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, workflowId, type, name, description || null, configJson, positionX, positionY]
        );
        const [rows] = await pool.query('SELECT * FROM `node` WHERE id = ?', [id]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error al crear el nodo:', error);
        res.status(500).json({ error: 'Error al crear el nodo' });
    }
};

// Actualizar un nodo existente
exports.updateNode = async (req, res) => {
    const nodeId = req.params.id;
    const { workflowId, type, name, description, configuration, positionX, positionY } = req.body;

    if (!workflowId || !type || !name || positionX == null || positionY == null) {
        return res.status(400).json({ error: 'workflowId, type, name, positionX y positionY son obligatorios' });
    }

    try {
        const [existing] = await pool.query('SELECT * FROM `node` WHERE id = ?', [nodeId]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Nodo no encontrado' });
        }

        const configJson = configuration ? JSON.stringify(configuration) : null;

        await pool.query(
            'UPDATE `node` SET workflowId = ?, type = ?, name = ?, description = ?, configuration = ?, positionX = ?, positionY = ? WHERE id = ?',
            [workflowId, type, name, description || null, configJson, positionX, positionY, nodeId]
        );

        const [rows] = await pool.query('SELECT * FROM `node` WHERE id = ?', [nodeId]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al actualizar el nodo:', error);
        res.status(500).json({ error: 'Error al actualizar el nodo' });
    }
};

// Eliminar un nodo
exports.deleteNode = async (req, res) => {
    const nodeId = req.params.id;
    try {
        const [existing] = await pool.query('SELECT * FROM `node` WHERE id = ?', [nodeId]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Nodo no encontrado' });
        }

        await pool.query('DELETE FROM `node` WHERE id = ?', [nodeId]);
        res.json({ message: 'Nodo eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el nodo:', error);
        res.status(500).json({ error: 'Error al eliminar el nodo' });
    }
};
