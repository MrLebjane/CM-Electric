package com.project.cmelectric.model;

public class Technician extends Users {
  String service;

public Technician() {
	super();
	// TODO Auto-generated constructor stub
}

public Technician(String user_ID,String user_Name, String user_Surname, String user_Email, String user_Phone, String user_Type,
		String user_Address, String user_Password,String dateAdded,String service) {
	super(user_ID,user_Name, user_Surname, user_Email, user_Phone, user_Type, user_Address, user_Password,dateAdded);
	// TODO Auto-generated constructor stub
	this.service=service;
}

public String getService() {
	return service;
}

public void setService(String service) {
	this.service = service;
}
  
}
