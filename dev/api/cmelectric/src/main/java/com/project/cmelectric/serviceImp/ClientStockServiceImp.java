package com.project.cmelectric.serviceImp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.cmelectric.DBUtil.DBUtil;
import com.project.cmelectric.model.ClientStock;
import com.project.cmelectric.model.Inventory;
import com.project.cmelectric.model.Users;
import com.project.cmelectric.service.ClientStockService;

@Service
public class ClientStockServiceImp implements ClientStockService {
	Connection connection;
    public ClientStockServiceImp() {
    	connection=DBUtil.getConnection();
    }
	@Override
	public boolean postClientStock(ClientStock clientstock) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
				boolean added=false;
				 int quantity=1;
				 
				 String query;
				 try {
					 
					 PreparedStatement stmt=connection.prepareStatement("SELECT * FROM  client_stock where Book_ID='"+clientstock.getBook_ID()+"' AND Stock_ID='"+clientstock.getItem_ID()+"'");
		 			ResultSet rs=stmt.executeQuery();
		 			
		 			while(rs.next()) {
		 				quantity+=rs.getInt(4);
		 			}
					 
					 
					 Statement stmt1 = connection.createStatement();
					 
					 if(quantity==1) {
					    query="insert into  client_stock(Book_ID,Stock_ID,Quantity) values('"+clientstock.getBook_ID()+"','"+clientstock.getItem_ID()+"','"+quantity+"')";
					 }
					 else {
						 query="update client_stock set Quantity='"+quantity+"' where Book_ID='"+clientstock.getBook_ID()+"' AND Stock_ID='"+clientstock.getItem_ID()+"'";
					 }
					 int result = stmt1.executeUpdate(query);
					 if(result!=0) {
						 added=true;
					 }
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return added;
	}
	@Override
	public List<ClientStock> getStock(String book_ID) {
		// TODO Auto-generated method stub
		List<ClientStock> stock=new ArrayList<>();
		try {
			 
			 PreparedStatement stmt=connection.prepareStatement("SELECT * FROM  client_stock where Book_ID='"+book_ID+"'");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				ClientStock item=new ClientStock();
				PreparedStatement stmt1=connection.prepareStatement("SELECT * FROM  inventory where Stock_ID='"+rs.getInt(2)+"'");
				item.setClientStock_ID(rs.getString(1));
				ResultSet rs1=stmt1.executeQuery();
				while(rs1.next()) {
					
					item.setItem_ID(rs1.getString(1));
					item.setItem_Category(rs1.getString(2));
					item.setItem_Name(rs1.getString(3));
					item.setItem_Brand(rs1.getString(4));
					item.setItem_Capacity(rs1.getString(5));
					item.setItem_Quantity(rs.getString(4));
					item.setItem_Price(rs1.getString(7));
					stock.add(item);
				}
			}
		}
		catch(SQLException exception) {
			
		}

		return stock;
	}
	@Override
	public boolean deleteClientStock(String clientStock_ID) {
		boolean added=false;
		String sql = "DELETE FROM client_stock WHERE clientStock_ID = '"+Integer.parseInt(clientStock_ID)+"'";

        try {
			PreparedStatement statement = connection.prepareStatement(sql);
			int rowsUpdated = statement.executeUpdate();
			if(rowsUpdated!=0) {
				added=true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return added;
	}
	

}
