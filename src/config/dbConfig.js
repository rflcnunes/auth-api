import Sequelize from 'sequelize';

const sequelize = new Sequelize('auth_db', 'auth_db_admin', 'auth', {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true,
    }
});

sequelize.authenticate().then(() => {
    console.info('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
    console.error(err.message);
});

export default sequelize;