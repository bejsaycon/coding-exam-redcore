import mongoose from "mongoose";
import config from 'config';

function connect() {
    const dbUri = config.get<string>('dbUri');
    return mongoose.connect(dbUri)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error in Connecting to MongoDB');
        process.exit(1);
    });
    
}
export default connect;