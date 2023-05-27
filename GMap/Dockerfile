# Use a golang image as a parent image
FROM golang:1.20.1

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules files
COPY go.mod .
COPY go.sum .

# Download and install the Go dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go binary
RUN go build -o main .

# Expose the port the application is running on
EXPOSE 91

# Set the command to run when the container starts
CMD ["./main"]
