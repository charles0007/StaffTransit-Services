package controllers

import (
	"encoding/json"
	"fmt"
	"gmap/database"
	"gmap/database/models"
	"gmap/utils"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var UserDetail models.Users

func GetUsersByBus(w http.ResponseWriter, r *http.Request) {
	var updateUser = &models.Users{}
	utils.ParseBody(r, updateUser)
	vars := mux.Vars(r)
	busId := vars["busId"]
	// ID, err := strconv.ParseInt(busId, 0, 0)
	// if err != nil {
	// 	fmt.Println("error while parsing")
	// }
	userDetails, db_err := database.GetAllUsersByBusId(busId)
	if db_err != nil {
		fmt.Println("error while parsing")
	}
	
	res, _ := json.Marshal(userDetails)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var updateUser = &models.Users{}
	utils.ParseBody(r, updateUser)
	vars := mux.Vars(r)
	userId := vars["userId"]
	ID, err := strconv.ParseInt(userId, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	userDetails, db_err := database.GetUserById(ID)
	if db_err != nil {
		fmt.Println("error while parsing")
	}
	if updateUser.Lat >0.0 {
		userDetails.Lat = updateUser.Lat
	}
	if updateUser.Lng >0.0 {
		userDetails.Lat = updateUser.Lng
	}
	database.UpdateUser(userDetails)
	res, _ := json.Marshal(userDetails)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
