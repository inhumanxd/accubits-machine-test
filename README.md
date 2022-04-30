# Newsletter API

An API to subscribe users to your newsletter and sending them newsletters from csv file using APIs.

MongoDB is used as database for storing user details. <br>
RabbitMQ is used as Messaging Broker to queue emails. <br>
You can use RabbitMQ server or Local instance of RabbitMQ. <br>
I have used local instance.

## Dependencies

- NodeJS
- RabbitMQ
- amqplib
- csv-parser
- dotenv
- express
- mongoose
- multer
- nodemailer

## Dev Dependencies

- nodemon

## Steps to run the code:

#### 1. Clone this [repository](https://github.com/inhumanxd/accubits-machine-test.git)

#### 2. Install Dependencies

```
npm install
```

#### 3. Create **development.env** and **production.env** from **sample.env**. <br>

You will find sample.env in environment folder. <br>
Create **development.env** and **production.env** in environment folder.

#### 4. Run Newsletter server

You will find scripts to run newsletter server in **package.json**.

```
npm run dev
```

This script/command will run newsletter server in development mode.

#### 5. Run consumer server

Consumer server consumes messages which are sent from newsletter server.

```
npm run devStartConsumer
```

This script/command runs consumer in development mode.

## Usage

### Newsletter Server

#### 1. Add Users

Subscribe to newsletter.

```
POST http://<serverUrl>:<port>/api/users
{
    email: required,
    firstName: required,
    lastName: optional,
    age: optional
}
```

We can also POST to
`http://<serverUrl>:<port>/api/newsletters/subscribe`

#### 2. Send Newsletter

Send newsletter to subscribed users using csv file.

```
POST http://<serverUrl>:<port>/api/newsletters
{
    csv_file: [File] required
    deleteAfterProcessing: optional
}
```

Send Newsletter API

- Uploads the csv file
- Parses the csv file
- Adds newsletter jobs to the queue.

### Consumer Server

Consumer server consumes the queue through RabbitMQ channel.

- Gets the users.
- Sends email to subscriber users.
- Logs the successful messages.
- Adds failed messages/jobs to parking-lot queue.
