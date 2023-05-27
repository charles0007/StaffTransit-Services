package models


// type User struct {
//     ID    uint   `gorm:"primaryKey"`
//     Name  string `gorm:"not null"`
//     Email string `gorm:"uniqueIndex;not null"`
// }

import (
    "time"
)

type Users struct {
    NativeId     uint      `gorm:"autoIncrement"`
    Id           string    `gorm:"primaryKey;type:uuid"`
    CreatedAt    time.Time `gorm:"default:CURRENT_TIMESTAMP"`
    UpdatedAt    time.Time `gorm:"autoUpdateTime"`
    Email        string    `gorm:"uniqueIndex"`
    Name         string
    Gender       string
    Phone        string
    IsAdmin      bool      `gorm:"default:false"`
    IsSuperAdmin bool      `gorm:"default:false"`
    IsActive     bool      `gorm:"default:true"`
    IsDeleted    bool      `gorm:"default:false"`
    Token        string
    DeviceToken  string
    Password     string
    OldPassword  string
    ImageName    string
    ImagePath    string
    BusID        string
    OrganisationID string
    Lat          float64
    Lng          float64
    CurrentAddress string
    BusStop      string
    BusStopLat   float64
    BusStopLng   float64
    IsOnline     bool      `gorm:"default:false"`
    ShareLocation bool     `gorm:"default:false"`
    Notification  bool     `gorm:"default:false"`
    Bus          Buses    `gorm:"foreignKey:BusID"`
    Organisation Organisations `gorm:"foreignKey:OrganisationID"`
}


  
