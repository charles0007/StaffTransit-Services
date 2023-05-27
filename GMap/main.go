package main

import (
	// "log"
	"fmt"
	"gmap/routes"
	"log"
	"net/http"
	"os"
	"github.com/gorilla/mux"
)

func main(){
	route := mux.NewRouter()
	routes.RegisterMapStoreRoutes(route)	
	http.Handle("/", route)
	// log.Fatal("nffjfkhdfkdf ")

	fmt.Printf("%+v\n", "runing  http://localhost:3000")
	port:=os.Getenv("PORT")
	log.Fatal(http.ListenAndServe(":"+port, route))
	
	// http.ListenAndServe("localhost:9011", r)
}

