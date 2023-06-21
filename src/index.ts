import { Kafka } from 'kafkajs';

const runKafkaConsumer = async () => {
	const kafka = new Kafka({
		clientId: 'poc-kafka',
		brokers: ['localhost:9092','localhost:9093','localhost:9094'],
	});

	const consumer = kafka.consumer({ groupId: 'group-poc' });

	await consumer.connect();

	await consumer.subscribe({ topics: ['poc-kafka'] });

	await consumer.run({
		eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
			console.log({
				key: message.key?.toString(),
				value: message.value?.toString(),
				headers: message.headers,
			})
		},
	});
}

runKafkaConsumer();