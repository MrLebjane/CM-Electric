package com.project.cmelectric.model;

public class Query {
	
	String Query_ID;
	String User_Name;
	String User_Email;
	String Subject;
	String Message;
	String Date;
	
	public Query() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Query(String query_ID,String user_Name, String user_Email, String subject, String message,String date) {
		super();
		Query_ID=query_ID;
		User_Name = user_Name;
		User_Email = user_Email;
		Subject = subject;
		Message = message;
		Date=date;
	}
	public String getQuery_ID() {
		return Query_ID;
	}
	public void setQuery_ID(String query_ID) {
		Query_ID = query_ID;
	}
	public String getUser_Name() {
		return User_Name;
	}
	public void setUser_Name(String user_Name) {
		User_Name = user_Name;
	}
	public String getUser_Email() {
		return User_Email;
	}
	public void setUser_Email(String user_Email) {
		User_Email = user_Email;
	}
	public String getSubject() {
		return Subject;
	}
	public void setSubject(String subject) {
		Subject = subject;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
	public String getDate() {
		return Date;
	}
	public void setDate(String date) {
		Date = date;
	}
	
}
