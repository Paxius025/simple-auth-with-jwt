#  Environment for writing APIs with Node.js and MySQL.

A development environment for writing APIs with Node.js, integrated with a MySQL database, and managed using Docker and Docker Compose. This setup also includes tools for database management and a frontend for testing purposes.

## Features

- **Backend**: Node.js API development environment with `nodemon` for live reloading.
- **Database**: MySQL 8.0 with persistent storage for API data.
- **Database Management**: phpMyAdmin for managing the MySQL database.
- **Frontend**: Nginx serving static files for testing or API documentation.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Paxius025/node-mysql-on-docker
   cd node-mysql-docker
   ```

2. **Environment Configuration**:
   - Rename a `.env copy` to `.env` file in the `backend` directory to configure the environment variables for the Node.js API. Example:
     ```env
     DB_HOST=mysql
     DB_USER=database_user
     DB_PASSWORD=database_password
     DB_NAME=database_name
     PORT=3000
     ```

     Mysql container

     ```Docker
     mysql:
      image: mysql:8.0
      container_name: sample-mysql
      restart: always
      environment:
         MYSQL_ROOT_PASSWORD: rootpassword
         MYSQL_DATABASE: database_name
         MYSQL_USER: database_user
         MYSQL_PASSWORD: database_password
     ```

3. **Start the Development Environment**:
   Run the following command to start all services:
   ```bash
   docker-compose up --build
   ```

4. **Access the Services**:
   - **Node.js API**: [http://localhost:3000](http://localhost:3000)
   - **phpMyAdmin**: [http://localhost:8088](http://localhost:8088) (for managing the MySQL database)
   - **Frontend (optional)**: [http://localhost:8080](http://localhost:8080)

5. **Access containers**:
    ```bash
    # docker exec -it <containers_name> bash
    # mysql container :
    docker exec -it mysql bash
    mysql -u database_user -p
    # password: database_password
    
    # api (nodejs) container :
    docker exec -it api bash
    ```

6. **Stop the Environment**:
   To stop all running containers, use:

   ```bash
    docker-compose down
   ```

## Writing APIs with Node.js

- The backend code is located in the `backend` directory.
- Use the `index.js` file as the entry point for your API.
- The `nodemon` tool is pre-installed and configured to automatically reload the server when you make changes to the code.

### Example API Endpoint

Here’s an example of how you can define an API endpoint in `server.js`:

```javascript
import express from "express";
import { config } from "dotenv";
import healthCheck from "./routes/dbHealth.js";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/db-health",healthCheck);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Project Structure

```
dorm-on-map/
├── backend/          # Node.js backend code
│   ├── package.json  # Node.js dependencies
│   ├── index.js      # Main entry point for the API
│   └── .env          # Environment variables for the backend
├── frontend/         # Frontend static files 
│   ├── index.html    # Check database connection
├── Dockerfile        # Dockerfile for the backend
├── docker-compose.yml # Docker Compose configuration
└── README.md         # Project documentation
```

## Notes

- The MySQL database data is persisted in the `db_data` volume.
- The backend uses `nodemon` for live reloading during development.
- Ensure the `.env` file in the `backend` directory matches the database credentials defined in `docker-compose.yml`.

## Troubleshooting

- If the API cannot connect to the database, verify the `.env` file and `docker-compose.yml` configurations.
- If containers fail to start, ensure Docker is running and the `app-network` is properly created.

## License

MIT License

Copyright (c) 2025 [Pantong]

Permission is hereby granted, free of charge, to any person obtaining a copy...
