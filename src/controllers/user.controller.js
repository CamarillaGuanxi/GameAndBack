import { getConnection } from '../database/db';
require('dotenv').config();

const db = getConnection();
const jwt = require('jsonwebtoken');


export const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        console.log(id);
        const result = await db.query('SELECT * FROM Usuario WHERE id = ?', [id]);
        if (result.length == 0) {
                return res.status(404).json({ error: 'Not Found' });
            }
        res.json(result[0]);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(200).status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.query;

    try {
        const result = await db.query('SELECT id FROM Usuario WHERE email = ? AND password = ?', [email, password]);
        if (result.length == 0) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const id = result[0].id;
        const accesstoken = jwt.sign({id: id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*60 })
        res.status(200).json({ accesstoken: accesstoken })
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const registerUser = async (req, res) => {
    const { username, password, email, fullName } = req.body;

    try {
        const result = await db.query('INSERT INTO Usuario (username, password, profilePictureId, email, fullName) VALUES (?, ?, 1, ?, ?)', [username, password, email, fullName]);
        const result2 = await db.query('SELECT id FROM Usuario WHERE email = ? AND password = ?', [email, password]);
        const id = result2[0].id;
        const accesstoken = jwt.sign({id: id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*60 })
        res.status(200).json({ accesstoken: accesstoken })
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const registerAddress = async (req, res) => {
    try {
        const { address, city, state, country, postalCode } = req.body;
        const { id } = req.user;
        console.log(id);
        const resultAddress = await db.query('UPDATE Usuario SET address = ? WHERE id = ?', [address, id]);
        const resultCity = await db.query('UPDATE Usuario SET city = ? WHERE id = ?', [city, id]);
        const resultState = await db.query('UPDATE Usuario SET state = ? WHERE id = ?', [state, id]);
        const resultCountry = await db.query('UPDATE Usuario SET country = ? WHERE id = ?', [country, id]);
        const resultPostalCode = await db.query('UPDATE Usuario SET postalCode = ? WHERE id = ?', [postalCode, id]);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const checkEmail = async (req, res) => {
    const { email } = req.query;

    try {
        const result = await db.query('SELECT id FROM Usuario WHERE email = ?', [email]);
        res.status(200).json(result);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const checkUsername = async (req, res) => {
    const { username } = req.query;

    try {
        const result = await db.query('SELECT id FROM Usuario WHERE username = ?', [username]);
        res.status(200).json(result);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET username = ? WHERE id = ?', [username, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET email = ? WHERE id = ?', [email, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET password = ? WHERE id = ?', [password, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeProfilePictureId = async (req, res) => {
    try {
        const { profilePictureId } = req.body;
        console.log('Profile Picture ID:', profilePictureId);
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET profilePictureId = ? WHERE id = ?', [profilePictureId, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeFullName = async (req, res) => {
    try {
        const { fullName } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET fullName = ? WHERE id = ?', [fullName, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET address = ? WHERE id = ?', [address, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeCity = async (req, res) => {
    try {
        const { city } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET city = ? WHERE id = ?', [city, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeState = async (req, res) => {
    try {
        const { state } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET state = ? WHERE id = ?', [state, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changeCountry = async (req, res) => {
    try {
        const { country } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET state = ? WHERE id = ?', [state, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const changePostalCode = async (req, res) => {
    try {
        const { postalCode } = req.body;
        const { id } = req.user;
        console.log(id);
        const result = await db.query('UPDATE Usuario SET postalCode = ? WHERE id = ?', [postalCode, id]);
        console.log(result);
        res.status(200).json({ message: 'User updated successfully', user: id });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
