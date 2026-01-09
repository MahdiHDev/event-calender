import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.connection_str}`,
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(50) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS event (
            event_id SERIAL PRIMARY KEY,
            title VARCHAR(250) NOT NULL,
            date DATE NOT NULL,
            description TEXT,
            category VARCHAR(100)
        )`);
};

export default initDB;
