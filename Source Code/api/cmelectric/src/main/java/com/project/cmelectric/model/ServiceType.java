package com.project.cmelectric.model;

public class ServiceType {
  String Service_ID;
  String Service_Type;
  String Service_Fee;
public ServiceType() {
	super();
	// TODO Auto-generated constructor stub
}
public ServiceType(String service_ID, String service_Type, String service_Fee) {
	super();
	Service_ID = service_ID;
	Service_Type = service_Type;
	Service_Fee = service_Fee;
}
public String getService_ID() {
	return Service_ID;
}
public void setService_ID(String service_ID) {
	Service_ID = service_ID;
}
public String getService_Type() {
	return Service_Type;
}
public void setService_Type(String service_Type) {
	Service_Type = service_Type;
}
public String getService_Fee() {
	return Service_Fee;
}
public void setService_Fee(String service_Fee) {
	Service_Fee = service_Fee;
}
 
  
}
