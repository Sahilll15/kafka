const { kafka } = require("./client");
const group = process.argv[2];
const mogoose = require('mongoose')



const connectDb = () => {
    return mogoose.connect('mongodb://localhost:27017/rider-location', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}


connectDb().then(async () => {
    console.log('Connected to the database')
}).catch(err => {
    console.log('Error connecting to the database', err)
})

const riderLocationSchema = new mogoose.Schema({
    name: String,
    location: String
})


const RiderLocation = mogoose.model('RiderLocation', riderLocationSchema)


async function init() {
    const consumer = kafka.consumer({ groupId: group });
    await consumer.connect();

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(
                `${group}: [${topic}]: PART:${partition}:`,
                message.value.toString()
            );

            const { name, location } = JSON.parse(message.value.toString());
            const riderLocation = new RiderLocation({ name, location });
            await riderLocation.save();

        },
    });
}

init();

