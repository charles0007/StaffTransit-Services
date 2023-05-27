package database
import (
   // "gorm.io/driver/postgres"
	"gmap/database/models"
	"github.com/google/uuid"

	
)



func CreateUser(user *models.Users) (*models.Users, error) {
	db, err := connectToDatabase()
    if err != nil {
		return nil,err
    }
	user.Id = uuid.NewString()

    result := db.Create(user)
    if result.Error != nil {
        return nil, result.Error
    }
    return user, nil
}

func GetUserById(Id int64) (*models.Users,error){
	db, err := connectToDatabase()
    if err != nil {
		return nil,err
    }
	var getUser models.Users
	db.Where("ID=?", Id).Find(&getUser)
	return &getUser,nil
}
func GetUserByUsername(UserName string) (*models.Users,error){
	db, err := connectToDatabase()
    if err != nil {
		return nil,err
    }
	var getUser models.Users
	db.Where("user_name=?", UserName).Find(&getUser)
	return &getUser,nil
}

func CountUserByUsername(UserName string) (int64, error){
	db, err := connectToDatabase()
    if err != nil {
		return 0,err
    }
	var getUser models.Users
	var count int64
	db.Model(&getUser).Where("user_name=?", UserName).Count(&count)
	return  count,nil
}

func DeleteUser(ID int64) (*models.Users,error){
	db, err := connectToDatabase()
    if err != nil {
		return nil,err
    }
	var user models.Users
	db.Where("ID=?", ID).Delete(user)
	return &user,nil
}

func GetAllUsers() ([]models.Users, error) {
	db, err := connectToDatabase()
    if err != nil {
        // handle error
		return nil,err
    }
    var users []models.Users
    result := db.Find(&users)
    if result.Error != nil {
        return nil, result.Error
    }
    return users, nil
}

func GetAllUsersByBusId(busId string) ([]models.Users, error) {
	db, err := connectToDatabase()
    if err != nil {
        // handle error
		return nil,err
    }
    var getUser []models.Users
	db.Where("bus_id=?", busId).Find(&getUser)
	return getUser,nil
}

// Update an existing user
func UpdateUser(user *models.Users) error {
	db, err := connectToDatabase()
    if err != nil {
        // handle error
		return err
    }
    // Update the user in the database
    err = db.Save(user).Error
    if err != nil {
        return err
    }

    return nil
}