import { getConnection } from '../database/db';

const db = getConnection();

/*export const getProductos = async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM Producto');
        res.json(result);
    }catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}*/

export const getProductos = async (req, res) => {
    try {
        console.log('yes')
        const result = await db.query('SELECT * FROM Producto');
        console.log('Result from database:', result); // Log the result to inspect it
        res.json(result);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
