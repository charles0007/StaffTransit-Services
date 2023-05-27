package utils

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
"gopkg.in/natefinch/lumberjack.v2"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func ParseBody(r *http.Request, x interface{}) {
	if body, err := ioutil.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), x); err != nil {
			return
		}
	}
}

func mapLogger() *zap.Logger {
	// Create a file logger
	fileWriter := zapcore.AddSync(&lumberjack.Logger{
		Filename:   "/path/to/your/log/file.log",
		MaxSize:    10, // Max size in megabytes before it's rotated
		MaxBackups: 5,  // Max number of old log files to keep
		MaxAge:     28, // Max number of days to retain log files
	})

	// Create a console logger
	consoleEncoder := zapcore.NewConsoleEncoder(zap.NewDevelopmentEncoderConfig())
	consoleWriter := zapcore.Lock(os.Stdout)

	// Create a new core that writes to both the file and console loggers
	core := zapcore.NewTee(
		zapcore.NewCore(consoleEncoder, consoleWriter, zap.DebugLevel),
		zapcore.NewCore(consoleEncoder, fileWriter, zap.DebugLevel),
	)

	// Create a new logger with the custom core
	logger := zap.New(core)

	// Defer a call to logger.Sync() to ensure all logs are written before the program exits
	defer logger.Sync()

	return logger
}

