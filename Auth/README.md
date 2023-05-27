# StaffTransit Authentication Microservice

The StaffTransit Authentication Microservice is a Node.js (TypeScript) microservice that handles authentication, including login and registration functionalities, for the StaffTransit system. It integrates with the StaffTransit microservice architecture, utilizing RabbitMQ for event management and communication between services.

## Features

- User Registration: Allows users to create new accounts by providing necessary registration details.
- User Login: Provides authentication for users to securely log in to the StaffTransit system.

## Technology Stack

The StaffTransit Authentication Microservice project utilizes the following technologies:

- Backend Language: Node.js with TypeScript
- Messaging Queue: RabbitMQ

## Getting Started

To run the StaffTransit Authentication Microservice locally, follow these steps:

1. Clone the StaffTransit-Services repository from GitHub:
   ```
   git clone https://github.com/charles0007/StaffTransit-Services.git
   ```

2. Navigate to the authentication microservice directory:
   ```
   cd StaffTransit-Services/Auth
   ```

3. Install the dependencies by running the following command:
   ```
   npm install
   ```

4. Set the necessary environment variables, such as the database connection details and RabbitMQ configuration.

5. Start the microservice:
   ```
   npm start
   ```

   The microservice will now be running locally, ready to handle authentication requests.

## How to Pull from the Git Repository

To pull the latest changes from the StaffTransit-Services repository, execute the following command:

```
git pull origin main
```

This command will fetch and merge the latest changes from the remote repository (origin) into your local branch (main).

## Contribution

Contributions to the StaffTransit Authentication Microservice are welcome. If you wish to contribute, please follow the guidelines specified in the [CONTRIBUTING](CONTRIBUTING.md) file.

## Feedback and Support

If you encounter any issues, have suggestions, or require support for the StaffTransit Authentication Microservice, please open an issue on the [GitHub repository](https://github.com/charles0007/StaffTransit-Services). We appreciate your feedback and will provide assistance as needed.

## License

The StaffTransit Authentication Microservice is licensed under the GNU General Public License 2.0 (GPL-2.0). Please see the [LICENSE](LICENSE) file for more details.

---

Please feel free to reach out if you have any further questions or need additional information.