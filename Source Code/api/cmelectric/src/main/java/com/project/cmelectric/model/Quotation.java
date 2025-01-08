package com.project.cmelectric.model;

import java.util.ArrayList;
import java.util.List;

public class Quotation extends Client {
  String Quotation_ID;
  String Service_Type;
  String Service_Fee;
  String grandtotal;
  List<Quotationproducts> QP=new ArrayList<>();



public Quotation() {
	super();
	// TODO Auto-generated constructor stub
}
public Quotation(String user_ID, String user_Name, String user_Surname, String user_Email, String user_Phone,
		String user_Type, String user_Address, String user_Password, String dateAdded, String service,
		String appointmentDate, String paid, String complete, String technician, String address, String book_ID,
		String inspection, String price, String time, String Quotation,String Feedback,String quotation_ID,String service_Type,String service_Fee,String grandtotal,List<Quotationproducts> qP,List<ClientTaskDates>clienttaskdates) {
	super(user_ID, user_Name, user_Surname, user_Email, user_Phone, user_Type, user_Address, user_Password, dateAdded,
			service, appointmentDate, paid, complete, technician, address, book_ID, inspection, price, time, Quotation,Feedback,clienttaskdates);
	// TODO Auto-generated constructor stub
	Quotation_ID = quotation_ID;
	Service_Type = service_Type;
	Service_Fee = service_Fee;
	this.grandtotal = grandtotal;
	QP = qP;
}
public String getQuotation_ID() {
	return Quotation_ID;
}
public void setQuotation_ID(String quotation_ID) {
	Quotation_ID = quotation_ID;
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
public String getGrandtotal() {
	return grandtotal;
}
public void setGrandtotal(String grandtotal) {
	this.grandtotal = grandtotal;
}
public List<Quotationproducts> getQP() {
	return QP;
}
public void setQP(List<Quotationproducts> qP) {
	QP = qP;
}
  
  
  
}
