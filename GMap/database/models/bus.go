package models

import (
    "time"
)

type Buses struct {
    NativeId        uint      `gorm:"autoIncrement"`
    Id              string    `gorm:"primaryKey;type:uuid"`
    CreatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP"`
    UpdatedAt       time.Time `gorm:"autoUpdateTime"`
    Driver          string
    Email           string
    Phone           string
    PlateNumber     string    `gorm:"uniqueIndex"`
    Route           string
    Lat             float64
    Lng             float64
    Password        string
    DeviceToken     string
    IsOnline        bool      `gorm:"default:false"`
    CurrentAddress  string
    ShareLocation   bool      `gorm:"default:false"`
    IsActive        bool      `gorm:"default:true"`
    IsDeleted       bool      `gorm:"default:false"`
    OrganisationID  string
    Users           []Users    `gorm:"foreignKey:BusID"`
    Organisation    Organisations `gorm:"foreignKey:OrganisationID"`
}
