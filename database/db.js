const mongoose = require('mongoose')


const dbConection = async () => {
    try {

       await mongoose.connect(process.env.MONGO_URI);
        console.log('DB IS CONNECTED');
    } catch (error) {
        console.log('THE ERROR IS', error);
        throw new Error('Error al iniciar la DB')
    }
}

module.exports = {
    dbConection
};