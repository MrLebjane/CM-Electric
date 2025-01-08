package com.project.cmelectric.model;

public class Quotationproducts {
   String Product_name;
   String Product_brand;
   String Product_capacity;
   String Quantity;
   String price;
public Quotationproducts() {
	super();
	// TODO Auto-generated constructor stub
}
public Quotationproducts(String product_name, String product_brand, String product_capacity, String quantity,
		String price) {
	super();
	Product_name = product_name;
	Product_brand = product_brand;
	Product_capacity = product_capacity;
	Quantity = quantity;
	this.price = price;
}
public String getProduct_name() {
	return Product_name;
}
public void setProduct_name(String product_name) {
	Product_name = product_name;
}
public String getProduct_brand() {
	return Product_brand;
}
public void setProduct_brand(String product_brand) {
	Product_brand = product_brand;
}
public String getProduct_capacity() {
	return Product_capacity;
}
public void setProduct_capacity(String product_capacity) {
	Product_capacity = product_capacity;
}
public String getQuantity() {
	return Quantity;
}
public void setQuantity(String quantity) {
	Quantity = quantity;
}
public String getPrice() {
	return price;
}
public void setPrice(String price) {
	this.price = price;
}

   
}
