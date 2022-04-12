const app = require ('./app');

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Application listening on port ${process.env.PORT}`);
    });
