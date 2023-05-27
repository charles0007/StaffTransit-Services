package database

import (
	"github.com/google/uuid"
	"gorm.io/gorm"

	// "gorm.io/driver/postgres"
	"gmap/database/models"
)

func createOrganisation(organisation *models.Organisations) (*models.Organisations, error) {
	db, err := connectToDatabase()
	if err != nil {
		return nil, err
	}
	organisation.Id = uuid.NewString()

	result := db.Create(organisation)
	if result.Error != nil {
		return nil, result.Error
	}
	return organisation, nil
}

func getAllOrganisations(db *gorm.DB) ([]models.Organisations, error) {
	db, err := connectToDatabase()
	if err != nil {
		// handle error
		return nil, err
	}
	var organisations []models.Organisations
	result := db.Find(&organisations)
	if result.Error != nil {
		return nil, result.Error
	}
	return organisations, nil
}

// Update an existing user
func UpdateOrganisation(organisation *models.Organisations) error {
	db, err := connectToDatabase()
	if err != nil {
		// handle error
		return err
	}
	// Update the user in the database
	err = db.Save(organisation).Error
	if err != nil {
		return err
	}

	return nil
}
