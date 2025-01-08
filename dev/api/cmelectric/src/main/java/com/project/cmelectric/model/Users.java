package com.project.cmelectric.model;

public class Users {
	String User_ID;
	String User_Name;
	String User_Surname; 
	String User_Email;
	String User_Phone;
	String User_Type;
	String User_Address;
	String User_Password;
	String dateAdded;
	
	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Users(String user_ID,String user_Name, String user_Surname, String user_Email, String user_Phone, String user_Type,
			String user_Address, String user_Password,String dateAdded) {
		super();
		User_ID=user_ID;
		User_Name = user_Name;
		User_Surname = user_Surname;
		User_Email = user_Email;
		User_Phone = user_Phone;
		User_Type = user_Type;
		User_Address = user_Address;
		User_Password = user_Password;
		this.dateAdded=dateAdded;
	}
	public String getUser_ID() {
		return User_ID;
	}
	public void setUser_ID(String user_ID) {
		User_ID=user_ID;
	}
	public String getUser_Name() {
		return User_Name;
	}
	public void setUser_Name(String user_Name) {
		User_Name = user_Name;
	}
	public String getUser_Surname() {
		return User_Surname;
	}
	public void setUser_Surname(String user_Surname) {
		User_Surname = user_Surname;
	}
	public String getUser_Email() {
		return User_Email;
	}
	public void setUser_Email(String user_Email) {
		User_Email = user_Email;
	}
	public String getUser_Phone() {
		return User_Phone;
	}
	public void setUser_Phone(String user_Phone) {
		User_Phone = user_Phone;
	}
	public String getUser_Type() {
		return User_Type;
	}
	public void setUser_Type(String user_Type) {
		User_Type = user_Type;
	}
	public String getUser_Address() {
		return User_Address;
	}
	public void setUser_Address(String user_Address) {
		User_Address = user_Address;
	}
	public String getUser_Password() {
		return User_Password;
	}
	public void setUser_Password(String user_Password) {
		User_Password = user_Password;
	}
	public String getDateAdded() {
		return dateAdded;
	}
	public void setDateAdded(String dateAdded) {
		this.dateAdded = dateAdded;
	}
	@Override
	public String toString() {
		return "Users [User_ID="+User_ID+",User_Name=" + User_Name + ", User_Surname=" + User_Surname + ", User_Email=" + User_Email
				+ ", User_Phone=" + User_Phone + ", User_Type=" + User_Type + ", User_Address=" + User_Address
				+ ", User_Password=" + User_Password + "]";
	}
}
