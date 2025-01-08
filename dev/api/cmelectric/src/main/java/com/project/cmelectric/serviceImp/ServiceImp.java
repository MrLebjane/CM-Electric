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
import com.project.cmelectric.model.ServiceType;
import com.project.cmelectric.service.Services;


@Service
public class ServiceImp implements Services {
	Connection connection;
	public ServiceImp() {
		connection=DBUtil.getConnection();
	}
	@Override
	public List<ServiceType> getServices() {
		// TODO Auto-generated method stub
		List<ServiceType> services=new ArrayList<>();
		try {
			 
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM  service");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				ServiceType service=new ServiceType();
				service.setService_ID(rs.getString(1));
				service.setService_Type(rs.getString(2));
				service.setService_Fee(rs.getString(3));
				services.add(service);
			}
		
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return services;
		
	}
	
	@Override
	public boolean AddService(ServiceType service) {
		// TODO Auto-generated method stub
		boolean added=false;
		try {
			 Statement stmt = connection.createStatement();
			 String query="insert into Service(Service_Type,Service_Fee) values('"+service.getService_Type()+"','"+service.getService_Fee()+"')";
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
	public boolean updateStock(String ID,String Service_fee) {
		// TODO Auto-generated method stub
		boolean added=false;
		
		String sql = "UPDATE service SET Service_Fee='"+Service_fee+"' WHERE Service_ID = '"+Integer.parseInt(ID)+"'";
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
