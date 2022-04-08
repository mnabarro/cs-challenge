module.exports = (sequelize, DataTypes) => {

    let alias = 'Customers'
    let cols = {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail : {}
            }
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate : {}
            }
        }
    };

    let config = {
        timestamps : false
    };

    const Customers = sequelize.define(alias, cols, config);
    
    return Customers;
}