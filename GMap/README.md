# StaffTransit Location Microservice

The StaffTransit Location Microservice is a standalone service built with Golang to handle location tracking functionality within the StaffTransit system. This microservice integrates with the StaffTransit API and utilizes RabbitMQ for event management.

## Features

- Real-time Location Tracking: The microservice enables tracking of staff bus locations in real-time.
- Event-based Architecture: It utilizes RabbitMQ as a messaging queue for managing location-related events.
- Integration with StaffTransit API: The microservice seamlessly integrates with the StaffTransit API to provide location data.

## Technology Stack

The StaffTransit Location Microservice project utilizes the following technologies:

- Programming Language: Golang
- Messaging Queue: RabbitMQ

## Getting Started

To run the StaffTransit Location Microservice locally, follow these steps:

1. Clone the StaffTransit-Services repository from GitHub:
   ```
   git clone https://github.com/charles0007/StaffTransit-Services.git
   ```

2. Navigate to the Location Microservice directory:
   ```
   cd StaffTransit-Services/GMap
   ```

3. Install the necessary dependencies by running:
   ```
   go mod download
   ```

4. Start the microservice:
   ```
   go run main.go
   ```

   The microservice will now be running locally and listening for location-related events.

## How to Pull from the Git Repository

To pull the latest changes from the StaffTransit-Services repository, execute the following command:

```
git pull origin main
```

This command will fetch and merge the latest changes from the remote repository (origin) into your local branch (main).

## Contribution

Contributions to the StaffTransit project, including the Location Microservice, are welcome. If you would like to contribute, please follow the guidelines outlined in the [CONTRIBUTING](CONTRIBUTING.md) file.

## Feedback and Support

If you encounter any issues, have suggestions, or need assistance with the StaffTransit Location Microservice, please open an issue on the [GitHub repository](https://github.com/charles0007/StaffTransit-Services). We appreciate your feedback and will do our best to assist you.

## License

The StaffTransit Location Microservice is licensed under the GNU General Public License 2.0 (GPL-2.0). Please see the [LICENSE](LICENSE) file for more details.

---

Please feel free to reach out if you have any further questions or need additional information.