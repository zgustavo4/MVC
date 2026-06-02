const db = require("../config/db");

const Mesa = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM mesas");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM mesas WHERE id = ?",
            [id]
        );

        return rows[0];
    },

    create: async (mesa) => {

        const { numero_mesa, status, quantidade_pessoas } = mesa;

        const [result] = await db.query(
            `
            INSERT INTO mesas
            (numero_mesa, status, quantidade_pessoas)
            VALUES (?, ?, ?)
            `,
            [numero_mesa, status, quantidade_pessoas]
        );

        return result;
    },

    update: async (id, mesa) => {

        const { numero_mesa, status, quantidade_pessoas } = mesa;

        const [result] = await db.query(
            `
            UPDATE mesas
            SET
            numero_mesa=?,
            status=?,
            quantidade_pessoas=?
            WHERE id=?
            `,
            [numero_mesa, status, quantidade_pessoas, id]
        );

        return result;
    },

    delete: async (id) => {
        const [result] = await db.query(
            "DELETE FROM mesas WHERE id=?",
            [id]
        );

        return result;
    }
};

module.exports = Mesa;