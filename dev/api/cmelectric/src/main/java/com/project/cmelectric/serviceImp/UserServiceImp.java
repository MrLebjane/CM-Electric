package com.project.cmelectric.serviceImp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cmelectric.DBUtil.DBUtil;
import com.project.cmelectric.model.Client;
import com.project.cmelectric.model.Technician;
import com.project.cmelectric.model.Users;
import com.project.cmelectric.service.EmailService;
import com.project.cmelectric.service.UsersService;

@Service
public class UserServiceImp implements UsersService {
     @Autowired
	 static List<Users>users= new ArrayList<>();
     Users user=new Users();
     Connection connection;
     @Autowired
     EmailService emailservice;
     public UserServiceImp() {
    	 connection=DBUtil.getConnection();
     }
     @Override
     public Users getUser(String password) {
    	// TODO Auto-generated method stub
 		try {
 			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_Password='"+password+"'");
 			ResultSet rs=stmt.executeQuery();
 			
 			while(rs.next()) {
 				Users user=new Users();
 				user.setUser_ID(rs.getString(1));
 				user.setUser_Name(rs.getString(2));
 				user.setUser_Surname(rs.getString(3)); 
 				user.setUser_Email(rs.getString(4));
 				user.setUser_Phone(rs.getString(5));
 				user.setUser_Type(rs.getString(6));
 				user.setUser_Address(rs.getString(7));
 				user.setUser_Password(rs.getString(8));
 				this.user=user;
 			}
 		} catch (SQLException e) {
 			// TODO Auto-generated catch block
 			e.printStackTrace();
 		}
 		return this.user;
     }
	@Override
	public List<Users> getUserData() {
		// TODO Auto-generated method stub
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User");
			ResultSet rs=stmt.executeQuery();
			
			while(rs.next()) {
				Users user=new Users();
				user.setUser_Name(rs.getString(2));
				user.setUser_Surname(rs.getString(3)); 
				user.setUser_Email(rs.getString(4));
				user.setUser_Phone(rs.getString(5));
				user.setUser_Type(rs.getString(6));
				user.setUser_Address(rs.getString(7));
				user.setUser_Password(rs.getString(8));
				users.add(user);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	
	//Add technician
	public boolean postTechnician(Technician user) {
		boolean added=false;
		try {
			
			String alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		    int N = alphabet.length();

		    Random r = new Random();
            String reference="";
		    for (int i = 0; i < 5; i++) {
		        reference=reference+(alphabet.charAt(r.nextInt(N)));
		    }
		     String body="Your Password code is: "+reference+". Do not lose the code.";
			 emailservice.sendEmail(user.getUser_Email().trim(),"Booking Reference", body); 
			 String query="insert into User(User_Name,User_Surname,User_Email,User_Phone,User_Type,User_Address,User_Password) values('"+user.getUser_Name()+"','"+user.getUser_Surname()+"','"+user.getUser_Email()+"','"+user.getUser_Phone()+"','Technician','"+user.getUser_Address()+"','"+reference+"')";
			 Statement stmt = connection.createStatement();
			 Statement stmt2 = connection.createStatement();
			 int result = stmt.executeUpdate(query,Statement.RETURN_GENERATED_KEYS);
			 if(result>0) {
				 try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
			            if (generatedKeys.next()){
			            	ResultSet id=stmt2.executeQuery("SELECT * FROM Service WHERE Service_Type='"+user.getService()+"'");
			            	while(id.next()) {
			            		//String query1="insert into Client values('"+generatedKeys.getLong(1)+"',"+id.getInt(1)+",false,false,'"+user.getAppointmentDate()+"')";
			            		String query1="insert into Technician(User_ID,Service_ID) values('"+generatedKeys.getLong(1)+"','"+id.getInt(1)+"')";        		
				                stmt.execute(query1);
			            	}
			            }
			            else {
			                throw new SQLException("Creating user failed, no ID obtained.");
			            }
				 added=true;
			     }
			 }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return added;
	}
	@Override
	public Users getUserE(String email) {
		// TODO Auto-generated method stub
		 		try {
		 			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_Email='"+email+"'");
		 			ResultSet rs=stmt.executeQuery();
		 			
		 			while(rs.next()) {
		 				Users user=new Users();
		 				user.setUser_ID(rs.getString(1));
		 				user.setUser_Name(rs.getString(2));
		 				user.setUser_Surname(rs.getString(3)); 
		 				user.setUser_Email(rs.getString(4));
		 				user.setUser_Phone(rs.getString(5));
		 				user.setUser_Type(rs.getString(6));
		 				user.setUser_Address(rs.getString(7));
		 				user.setUser_Password(rs.getString(8));
		 				this.user=user;
		 			}
		 		} catch (SQLException e) {
		 			// TODO Auto-generated catch block
		 			e.printStackTrace();
		 		}
		 		return this.user;
	}
	@Override
	public boolean postClient(Users user) {
		// TODO Auto-generated method stub
		boolean added=false;
		 String query="insert into User(User_Name,User_Surname,User_Email,User_Phone,User_Type,User_Password) values('"+user.getUser_Name()+"','"+user.getUser_Surname()+"','"+user.getUser_Email()+"','"+user.getUser_Phone()+"','Client','"+user.getUser_Password()+"')";
		 
		 try {
			 Statement stmt = connection.createStatement();
//			Statement stmt2 = connection.createStatement();
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
	public boolean updateDetails(Users user, String user_ID) {
		// TODO Auto-generated method stub
		boolean added=false;
		try {
			Statement stmt = connection.createStatement();
			 String query="update user set User_Name='"+user.getUser_Name()+"',User_Surname='"+user.getUser_Surname()+"',User_Email='"+user.getUser_Email()+"',User_Address='"+user.getUser_Address()+"',User_Phone='"+user.getUser_Phone()+"' where User_ID='"+user_ID+"' ";
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
