const db = require('../models');
const {
    Op
} = require('sequelize');

const usersAPI = {

    list: async (req, res) => {
        let found = await db.Customers.findAll();

        return res.status(200).json({
            status: '200 OK',
            count: found.length,
            data: found
        });
    },

    create: async (req, res) => {
        let data = req.body;

        if (data) {
            try {
                await db.Customers.create(data);
                return res.status(201).json({
                    status: '201 Created',
                    data
                });

            } catch (err) {
                return res.status(400).json({
                    status: '400 Bad Request',
                    message: err.message
                });
            }
        }
    },

    findByPk: async (req, res) => {
        let id = req.params.id

        let found = await db.Customers.findByPk(id);

        if (found) {
            return res.status(200).json({
                status: '200 OK',
                data: found
            });

        } else {
            return res.status(404).json({
                status: '404 Not Found',
            });
        }
    },
    search: async (req, res) => {
        let lookFor = req.params.lookFor

        let found = await db.Customers.findAll({
            where: {
                [Op.or]: [{
                        name: {
                            [Op.substring]: lookFor
                        }
                    },
                    {
                        surName: {
                            [Op.substring]: lookFor
                        }
                    },
                    {
                        email: {
                            [Op.substring]: lookFor
                        }
                    },
                ]
            }
        });

        if (found.length>0) {
            return res.status(200).json({
                status: '200 OK',
                count: found.length,
                data: found
            });

        } else {
            return res.status(404).json({
                status: '404 Not Found',
            });
        }
    },

    update: async (req, res) => {
        let data = req.body;
        let id = req.params.id

        let found = await db.Customers.findByPk(id);

        if (!found) {
            return res.status(404).json({
                status: '404 Not Found',
                id
            });
        }

        if (data) {
            try {
                await db.Customers.update(data, {
                    where: {
                        id: id
                    }
                });
                //Recover customer with modifications
                data = await db.Customers.findByPk(id);

                return res.status(200).json({
                    status: '200 OK',
                    data
                });

            } catch (err) {
                return res.status(400).json({
                    status: '400 Bad Request',
                    message: err.message
                });
            }
        }

    },

    delete: async (req, res) => {
        let id = req.params.id

        let found = await db.Customers.findByPk(id);

        if (!found) {
            return res.status(404).json({
                status: '404 Not Found',
                id
            });
        }

        try {
            await db.Customers.destroy({
                where: {
                    id: id
                }
            });

            return res.status(200).json({
                status: '200 OK',
                id
            });

        } catch (err) {
            return res.status(400).json({
                status: '400 Bad Request',
                message: err.message
            });
        }
    },

}

module.exports = usersAPI;