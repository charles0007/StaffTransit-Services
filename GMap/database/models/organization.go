package models
import (
    "time"
)

type Organisations struct {
    NativeId        uint      `gorm:"autoIncrement"`
    Id              string    `gorm:"primaryKey;type:uuid"`
    CreatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP"`
    UpdatedAt       time.Time `gorm:"autoUpdateTime"`
    Name            string    `gorm:"uniqueIndex"`
    Website         string    `gorm:"uniqueIndex"`
    Password        string
    IsActive        bool      `gorm:"default:true"`
    IsDeleted       bool      `gorm:"default:false"`
    Address         string
    City            string
    State           string
    OpenHr          string
    OpenMin         string
    CloseHr         string
    CloseMin        string
    Lat             float64
    Lng             float64
    Users           []Users    `gorm:"foreignKey:OrganisationID"`
    Buses           []Buses     `gorm:"foreignKey:OrganisationID"`
}
