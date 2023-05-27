package database

import (
	"github.com/google/uuid"
	"gorm.io/gorm"

	// "gorm.io/driver/postgres"
	"gmap/database/models"
)

func createBus(bus *models.Buses) (*models.Buses, error) {
	db, err := connectToDatabase()
	if err != nil {
		return nil, err
	}
	bus.Id = uuid.NewString()
	result := db.Create(bus)
	if result.Error != nil {
		return nil, result.Error
	}
	return bus, nil
}

func GetAllBus(db *gorm.DB) ([]models.Buses, error) {
	db, err := connectToDatabase()
	if err != nil {
		// handle error
		return nil, err
	}
	var buses []models.Buses
	result := db.Find(&buses)
	if result.Error != nil {
		return nil, result.Error
	}
	return buses, nil
}

// Update an existing user
func UpdateBus(bus *models.Buses) error {
	db, err := connectToDatabase()
	if err != nil {
		// handle error
		return err
	}
	// Update the user in the database
	err = db.Save(bus).Error
	if err != nil {
		return err
	}

	return nil
}
