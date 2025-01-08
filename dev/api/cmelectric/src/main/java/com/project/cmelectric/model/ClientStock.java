package com.project.cmelectric.model;

public class ClientStock extends Inventory {
   String ClientStock_ID;
   String Book_ID;
   String StockQuantity;
public ClientStock() {
	super();
	// TODO Auto-generated constructor stub
}
public ClientStock(String ClientStock_ID,String Book_ID,String StockQuantity,String item_ID, String item_Category, String item_Name, String item_Brand, String item_Capacity,
		String item_Quantity, String item_Price) {
	super(item_ID, item_Category, item_Name, item_Brand, item_Capacity, item_Quantity, item_Price);
	// TODO Auto-generated constructor stub
	this.ClientStock_ID=ClientStock_ID;
	this.Book_ID=Book_ID;
	this.StockQuantity=StockQuantity;
}
public String getClientStock_ID() {
	return ClientStock_ID;
}
public void setClientStock_ID(String clientStock_ID) {
	ClientStock_ID = clientStock_ID;
}
public String getBook_ID() {
	return Book_ID;
}
public void setBook_ID(String book_ID) {
	Book_ID = book_ID;
}
public String getStockQuantity() {
	return StockQuantity;
}
public void setStockQuantity(String quantity) {
	StockQuantity = quantity;
}

   
   
}
