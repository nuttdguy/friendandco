const app = require('../app');

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
