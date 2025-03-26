const Hapi = require('@hapi/hapi');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const User = require('./models/User');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message
                        console.error('ValidationError:', err.message);
                        throw err;
                    } else {
                        // During development, respond with the full error
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    });

    // Register routes
    server.route(userRoutes);

    // Database connection
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        // Sync models
        await sequelize.sync({ alter: true }); // Use { force: true } only in development to drop tables
        console.log('Database synchronized');
        
        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch (err) {
        console.error('Unable to start server:', err);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

init();




// const Hapi = require('@hapi/hapi');
// const userRoutes = require('./routes/userRoutes');
// const sequelize = require('./config/database');
// const User = require('./models/User');

// const init = async() => {
//     const server = Hapi.server({
//         port:9000,
//         host:'localhost',
//     });
   
//     await sequelize.sync({force:false});
//     server.route(userRoutes);

//     await server.start();

//     console.log('Server running on %s', server.info.uri);
// };


// process.on('unhandledRejection', (err)=>{
//     console.log(err);
//     process.exit(1);
// });

// init();

