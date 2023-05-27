package database


import (
    "gorm.io/gorm"
    "gorm.io/driver/postgres"
)

func connectToDatabase() (*gorm.DB, error) {
	dsn := "host=localhost user=postgres password=080charly dbname=StaffTransit port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }
    return db, nil
}
