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
import com.project.cmelectric.model.Inventory;
import com.project.cmelectric.service.InventoryService;

@Service
public class InventoryServiceImp implements InventoryService {
     
	Connection connection;
    public InventoryServiceImp() {
    	connection=DBUtil.getConnection();
    }

	@Override
	public boolean AddStock(Inventory item) {
		// TODO Auto-generated method stub
		boolean added=false;
		try {
			Statement stmt = connection.createStatement();
			 String query="insert into Inventory(Category,Item_name,Brand,Capacity,Quantity,Item_price) values('"+item.getItem_Category()+"','"+item.getItem_Name()+"','"+item.getItem_Brand()+"','"+item.getItem_Capacity()+"','"+Integer.parseInt(item.getItem_Quantity())+"','"+Double.parseDouble(item.getItem_Price())+"')";
			 int result = stmt.executeUpdate(query);
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
	public List<Inventory> getStock(String category) {
		// TODO Auto-generated method stub
		List<Inventory> stock=new ArrayList<>();
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM Inventory where Category='"+category+"'");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				Inventory item=new Inventory();
				item.setItem_ID(rs.getString(1));
				item.setItem_Category(rs.getString(2));
				item.setItem_Name(rs.getString(3));
				item.setItem_Brand(rs.getString(4));
				item.setItem_Capacity(rs.getString(5));
				item.setItem_Quantity(rs.getString(6));
				item.setItem_Price(rs.getString(7));
				if(Integer.parseInt(rs.getString(8))==0) {
					stock.add(item);
				}
			}
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return stock;	
	}

	@Override
	public List<Inventory> getAllStock() {
		List<Inventory> stock=new ArrayList<>();
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM Inventory");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				Inventory item=new Inventory();
				item.setItem_ID(rs.getString(1));
				item.setItem_Category(rs.getString(2));
				item.setItem_Name(rs.getString(3));
				item.setItem_Brand(rs.getString(4));
				item.setItem_Capacity(rs.getString(5));
				item.setItem_Quantity(rs.getString(6));
				item.setItem_Price(rs.getString(7));
				if(Integer.parseInt(rs.getString(8))==0) {
					stock.add(item);
				}
			}
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return stock;	
	}

	@Override
	public boolean deleteStock(String ID) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "UPDATE inventory SET removed ='1' WHERE Stock_ID = '"+Integer.parseInt(ID)+"'";
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

	@Override
	public boolean UpdateStock(Inventory item,String Stock_ID) {
		// TODO Auto-generated method stub
				boolean added=false;
				try {
					Statement stmt = connection.createStatement();
					 String query="update inventory set Item_name='"+item.getItem_Name()+"',Brand='"+item.getItem_Brand()+"',Capacity='"+item.getItem_Capacity()+"',Quantity='"+Integer.parseInt(item.getItem_Quantity())+"',Item_price='"+Double.parseDouble(item.getItem_Price())+"' where Stock_ID='"+Stock_ID+"' ";
					 int result = stmt.executeUpdate(query);
					 if(result!=0) {
						 added=true;
					 }
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return added;
	}
}
