module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    DATABASE: 'lab_5',
    //MULTIPLESTATEMENTS: true,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
