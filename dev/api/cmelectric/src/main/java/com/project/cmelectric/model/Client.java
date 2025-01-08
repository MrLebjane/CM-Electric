package com.project.cmelectric.model;

import java.util.List;

public class Client extends Users {
   String service;
   String appointmentDate;
   String paid;
   String complete;
   String technician;
   String address;
   String book_ID;
   String inspection;
   String price;
   String time;
   String Quotation;
   String Feedback;
   List<ClientTaskDates> clienttaskdates;

public Client() {
	super();
	// TODO Auto-generated constructor stub
}
public Client(String user_ID,String user_Name, String user_Surname, String user_Email, String user_Phone, String user_Type,
		String user_Address, String user_Password,String dateAdded,String service, String appointmentDate,String paid,String complete,
		String technician,String address,String book_ID,String inspection,String price,String time,String Quotation,String Feedback,List<ClientTaskDates> clienttaskdates ) {
	super(user_ID,user_Name, user_Surname, user_Email, user_Phone, user_Type, user_Address, user_Password,dateAdded);
	// TODO Auto-generated constructor stub
	this.service = service;
	this.appointmentDate = appointmentDate;
	this.paid=paid;
	this.complete=complete;
	this.technician=technician;
	this.address=address;
	this.book_ID = book_ID;
	this.inspection=inspection;
	this.Feedback=Feedback;
	this.clienttaskdates=clienttaskdates;
}
public String getBook_ID() {
	return book_ID;
}
public void setBook_ID(String book_ID) {
	this.book_ID = book_ID;
}
public String getService() {
	return service;
}
public void setService(String service) {
	this.service = service;
}
public String getAppointmentDate() {
	return appointmentDate;
}
public void setAppointmentDate(String AppointmentDate) {
	this.appointmentDate = AppointmentDate;
}
public String getPaid() {
	return paid;
}
public void setPaid(String paid) {
	this.paid = paid;
}
public String getComplete() {
	return complete;
}
public void setComplete(String complete) {
	this.complete = complete;
}
public String getAddress() {
	return address;
}
public void setAddress(String address) {
	this.address = address;
}
public String getTechnician() {
	return technician;
}
public void setTechnician(String technician) {
	this.technician = technician;
}
public String getInspection() {
	return inspection;
}
public void setInspection(String inspection) {
	this.inspection = inspection;
}
public String getPrice() {
	return price;
}
public void setPrice(String price) {
	this.price = price;
}
public String getTime() {
	return time;
}
public void setTime(String time) {
	this.time = time;
}
public String getQuotation() {
	return Quotation;
}
public void setQuotation(String quotation) {
	Quotation = quotation;
}
public String getFeedback() {
	return Feedback;
}
public void setFeedback(String feedback) {
	Feedback = feedback;
}
public List<ClientTaskDates> getClienttaskdates() {
	return clienttaskdates;
}
public void setClienttaskdates(List<ClientTaskDates> clienttaskdates) {
	this.clienttaskdates = clienttaskdates;
}

}
