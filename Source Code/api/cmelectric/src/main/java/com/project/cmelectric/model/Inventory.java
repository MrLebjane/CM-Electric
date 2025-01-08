package com.project.cmelectric.model;

public class Inventory {
  private String item_ID;
  private String item_Category;
  private String item_Name;
  private String item_Brand;
  private String item_Capacity;
  private String item_Quantity;
  private String item_Price;
public Inventory() {
	super();
	// TODO Auto-generated constructor stub
}
public Inventory(String item_ID, String item_Category, String item_Name, String item_Brand, String item_Capacity,
		String item_Quantity, String item_Price) {
	super();
	this.item_ID = item_ID;
	this.item_Category = item_Category;
	this.item_Name = item_Name;
	this.item_Brand = item_Brand;
	this.item_Capacity = item_Capacity;
	this.item_Quantity = item_Quantity;
	this.item_Price = item_Price;
}
public String getItem_ID() {
	return item_ID;
}
public void setItem_ID(String item_ID) {
	this.item_ID = item_ID;
}
public String getItem_Category() {
	return item_Category;
}
public void setItem_Category(String item_Category) {
	this.item_Category = item_Category;
}
public String getItem_Name() {
	return item_Name;
}
public void setItem_Name(String item_Name) {
	this.item_Name = item_Name;
}
public String getItem_Brand() {
	return item_Brand;
}
public void setItem_Brand(String item_Brand) {
	this.item_Brand = item_Brand;
}
public String getItem_Capacity() {
	return item_Capacity;
}
public void setItem_Capacity(String item_Capacity) {
	this.item_Capacity = item_Capacity;
}
public String getItem_Quantity() {
	return item_Quantity;
}
public void setItem_Quantity(String item_Quantity) {
	this.item_Quantity = item_Quantity;
}
public String getItem_Price() {
	return item_Price;
}
public void setItem_Price(String item_Price) {
	this.item_Price = item_Price;
}

}
