package com.project.cmelectric.model;

public class ClientTaskDates {
  String clienttask_ID;
  String Book_ID;
  String clienttaskdate;
  
  
  
public ClientTaskDates() {
	super();
	// TODO Auto-generated constructor stub
}

public ClientTaskDates(String clienttask_ID, String book_ID, String clienttaskdate) {
	super();
	this.clienttask_ID = clienttask_ID;
	Book_ID = book_ID;
	this.clienttaskdate = clienttaskdate;
}

public String getClienttask_ID() {
	return clienttask_ID;
}
public void setClienttask_ID(String clienttask_ID) {
	this.clienttask_ID = clienttask_ID;
}
public String getBook_ID() {
	return Book_ID;
}
public void setBook_ID(String book_ID) {
	Book_ID = book_ID;
}
public String getClienttaskdate() {
	return clienttaskdate;
}
public void setClienttaskdate(String clienttaskdate) {
	this.clienttaskdate = clienttaskdate;
}
  
  
}
