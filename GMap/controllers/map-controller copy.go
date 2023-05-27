package controllers

// import(
// 	"encoding/json"
// 	"fmt"
// 	"github.com/gorilla/mux"
// 	"net/http"
// 	"strconv"
// 	"gmap/utils"
// 	"users/models"
// )

// var NewUserDetailh models.UserDetail

// func GetUser(w http.ResponseWriter, r *http.Request){
// 	newUsers:=models.GetAllUsers()
// 	res, _ :=json.Marshal(newUsers)
// 	w.Header().Set("Content-Type","pkglication/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(res)
// }

// func GetUserById(w http.ResponseWriter, r *http.Request){
// 	vars := mux.Vars(r)
// 	userId := vars["userId"]
// 	ID, err:= strconv.ParseInt(userId,0,0)
// 	if err != nil {
// 		fmt.Println("error while parsing")
// 	}
// 	userDetails, _:= models.GetUserById(ID)
// 	res, _ := json.Marshal(userDetails)
// 	w.Header().Set("Content-Type","pkglication/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(res)
// }

// func CreateUser(w http.ResponseWriter, r *http.Request){
// 	CreateUser := &models.UserDetail{}
// 	utils.ParseBody(r, CreateUser)
// 	b:= CreateUser.CreateUser()
// 	res, _ := json.Marshal(b)
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(res)
// }

// func DeleteUser(w http.ResponseWriter, r *http.Request){
// 	vars := mux.Vars(r)
// 	userId := vars["userId"]
// 	ID, err := strconv.ParseInt(userId, 0,0)
// 	if err != nil {
// 		fmt.Println("error while parsing")
// 	}
// 	user := models.DeleteUser(ID)
// 	res, _ := json.Marshal(user)
// 	w.Header().Set("Content-Type", "pkglication/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(res)
// }

// func UpdateUserh(w http.ResponseWriter, r *http.Request){
// 	var updateUser = &models.UserDetail{}
// 	utils.ParseBody(r, updateUser)
// 	vars := mux.Vars(r)
// 	userId := vars["userId"]
// 	ID, err := strconv.ParseInt(userId, 0,0)
// 	if err != nil {
// 		fmt.Println("error while parsing")
// 	}
// 	userDetails, db:=models.GetUserById(ID)
// 	if updateUser.BusStop!=""{
// 		userDetails.BusStop=updateUser.BusStop
// 	}
// 	if updateUser.Department!=""{
// 		userDetails.Department=updateUser.Department
// 	}
// 	if updateUser.DeviceToken!=""{
// 		userDetails.DeviceToken=updateUser.DeviceToken
// 	}
// 	if updateUser.Gender!=""{
// 		userDetails.Gender=updateUser.Gender
// 	}
// 	if updateUser.Icon!=""{
// 		userDetails.Icon=updateUser.Icon
// 	}
// 	if updateUser.Image!=""{
// 		userDetails.Image=updateUser.Image
// 	}
// 	if updateUser.Location!=""{
// 		userDetails.Location=updateUser.Location
// 	}
// 	if updateUser.Name!=""{
// 		userDetails.Name=updateUser.Name
// 	}
// 	if updateUser.Password!=""{
// 		userDetails.Password=updateUser.Password
// 	}
// 	if updateUser.Phone!=""{
// 		userDetails.Phone=updateUser.Phone
// 	}
// 	if updateUser.UserName!=""{
// 		userDetails.UserName=updateUser.UserName
// 	}
// 	if updateUser.Latitude!=0{
// 		userDetails.Latitude=updateUser.Latitude
// 	}
// 	if updateUser.Longitude!=0{
// 		userDetails.Longitude=updateUser.Longitude
// 	}

// 	db.Save(&userDetails)
// 	res, _ := json.Marshal(userDetails)
// 	w.Header().Set("Content-Type", "pkglication/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(res)
// }