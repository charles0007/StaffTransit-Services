package routes

import (
	"gmap/controllers"
	// "users/utils"
	"github.com/gorilla/mux"
)

var RegisterMapStoreRoutes = func(router *mux.Router){
	// router.HandleFunc("/user/", controllers.CreateUser).Methods("POST")
	// router.HandleFunc("/login/", controllers.Login).Methods("POST")
	// router.HandleFunc("/home/", controllers.Home).Methods("GET")
	// router.HandleFunc("/user/", controllers.GetUser).Methods("GET")
	// router.HandleFunc("/user/{userId}", controllers.GetUserById).Methods("GET")
	// router.HandleFunc("/user/{userId}", controllers.UpdateUser).Methods("PUT")
	router.HandleFunc("/get/map/users/{busId}", controllers.GetUsersByBus).Methods("POST")

	
}