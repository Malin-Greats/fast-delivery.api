AUTHENTICATION

Admin

auth/admin/sign-up 			POST

auth/admin/login 			POST

---------------------------------------------------------------------------------------------------
Customer

auth/customer/sign-up  			POST

auth/customer/login 			POST

---------------------------------------------------------------------------------------------------
Driver
auth/driver/sign-up 			POST
auth/driver/login 			POST

--------------------------------------------------------------------------------------------------
CUSTOMER

Customer: What customer can do

1. Profile

/customer/profile 			GET

/customer/profile-edit 			PUT

/customer/change-password 		PUT

/customer/change-profile-photo		PUT	

---------------------------------------------------------------------------------------------------
2. Ride Requests

 /ride-requets/send 			POST 	send ride request

 /ride-requets/:requestId/cancel	PUT	cancel customer ride request

 /ride-requets/current			GET	get current pending requests for the customer

 /ride-requets/:requestId   		GET  	get one request by id

 /ride-requets   			GET	get all made ride requests for the current customer

 /ride-requets/:requestId/delete	DELETE 	delete auth customer ride requests
 
 --------------------------------------------------------------------------------------------------
2. Rides
 /rides/current 			POST 	send ride request

 /rides/my-rides			PUT	cancel customer ride request

 /rides/cancel				GET	get current pending requests for the customer

 /rides/:rideId   			GET  	get one request by id
 


Admin: What the admin can do for customers

---------------------------------------------------------------------------------------------------

DRIVER
Driver: What customer can do

1. Profile

/driver/profile 			GET

/driver/profile-edit 			PUT

/driver/change-password 		PUT

/driver/change-profile-photo		PUT	

---------------------------------------------------------------------------------------------------

2. Driver Documents

/driver/documents 			POST 	add driver documents 

/driver/documents 			GET	get driver documents 

/driver/documents 			PUT	update driver documents 

/driver/documents 	   		DELETE  delete driver documents 
 
---------------------------------------------------------------------------------------------------
 
3. Driver Vehicles

/driver/vehicles 			POST 	add driver vehicle

/driver/vehicles 			GET 	get all driver vehicles 

/driver/vehicles/:vehicleId 		GET	get driver vehicle by id

/driver/vehicles/:vehicleId 		PUT	update driver vehicle by id

/driver/vehicles/:vehicleId 	   	DELETE  delete driver vehicle by id 
 
 
---------------------------------------------------------------------------------------------------
2. Ride Requests

 /ride-requets/:requestId/accept 	PUT 	send ride request

 /ride-requets/all-pending		GET	get all pending requests that are to be accepted
 
 
---------------------------------------------------------------------------------------------------
2. Rides

/rides/cancel			POST	cancel a ride 

/rides/current 			GET 	get current accepted, started ride. ride which is not finished yet 

/rides/my-rides			GET	get  driver rides request

/rides/start   			PUT  	notifying customer that the ride has started

/rides/stop 			PUT	notifying that the ride has ended

---------------------------------------------------------------------------------------------------
Admin: What the admin can do for drivers
---------------------------------------------------------------------------------------------------
ADMIN

1. Roles
2. Ride Types
3. Drivers
4. Customers
5. Rides
6. Ride Requests