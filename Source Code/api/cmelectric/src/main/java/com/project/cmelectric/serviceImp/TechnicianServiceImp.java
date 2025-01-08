package com.project.cmelectric.serviceImp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mysql.cj.protocol.Resultset;
import com.project.cmelectric.DBUtil.DBUtil;
import com.project.cmelectric.model.Client;
import com.project.cmelectric.model.Inventory;
import com.project.cmelectric.model.Technician;
import com.project.cmelectric.service.TechnicianService;

@Service
public class TechnicianServiceImp implements TechnicianService {
    
	Connection connection;
    public TechnicianServiceImp() {
    	connection=DBUtil.getConnection();
    }
	public List<Technician> getTechnicians() {
		// TODO Auto-generated method stub
	    List<Technician> users=new ArrayList<>();
	    int isDeleted=1;
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_Type='Technician'");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Technician where User_ID="+rs.getInt(1));

				Technician user=new Technician();
				user.setUser_ID(rs.getString(1));
				user.setUser_Name(rs.getString(2));
				user.setUser_Surname(rs.getString(3)); 
				user.setUser_Email(rs.getString(4));
				user.setUser_Phone(rs.getString(5));
				user.setUser_Type(rs.getString(6));
				user.setUser_Address(rs.getString(7));
				user.setUser_Password(rs.getString(8));
				user.setDateAdded(rs.getString(9));
				
				ResultSet rsc=stmnt.executeQuery();
				while(rsc.next()) {
					PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.valueOf(rsc.getString(2)));
					isDeleted=Integer.valueOf(rsc.getString(3));
					ResultSet rss=stmnt2.executeQuery();
					while(rss.next()) {
						user.setService(rss.getString(2));
					}
				}
				if(isDeleted==0) {
				   users.add(user);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public Technician getTechnician(String ID) {
		Technician user=new Technician();
		int isDeleted=1;
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_ID='"+ID+"'");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Technician where User_ID="+rs.getInt(1));

				
				user.setUser_ID(rs.getString(1));
				user.setUser_Name(rs.getString(2));
				user.setUser_Surname(rs.getString(3)); 
				user.setUser_Email(rs.getString(4));
				user.setUser_Phone(rs.getString(5));
				user.setUser_Type(rs.getString(6));
				user.setUser_Address(rs.getString(7));
				user.setUser_Password(rs.getString(8));
				
				ResultSet rsc=stmnt.executeQuery();
				while(rsc.next()) {
					PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.valueOf(rsc.getString(2)));
					isDeleted=Integer.valueOf(rsc.getString(3));
					ResultSet rss=stmnt2.executeQuery();
					while(rss.next()) {
						user.setService(rss.getString(2));
					}
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}if(isDeleted==0) {
		   return user;
		}
		else {
			return null;
		}
	}
	@Override
	public boolean removeTechnician(String ID) {
		// TODO Auto-generated method stub
		boolean added=false;
		boolean notassigned=true;
		String sql = "UPDATE technician SET removed =1 WHERE User_ID = '"+Integer.parseInt(ID)+"'";
        List<Client> clients=new ArrayList<>();
        ClientServiceImp assclients=new ClientServiceImp();
        clients=assclients.getAssignedBookings(ID);
        for(Client client:clients){
        	if(Integer.parseInt(client.getComplete())==0) {
        		notassigned=false;
        		break;
        	}
        }
        // Step 3: Prepare the SQL statement with parameters
        try {
			if(notassigned) {
				PreparedStatement statement = connection.prepareStatement(sql);
				int rowsUpdated = statement.executeUpdate();
				if(rowsUpdated!=0) {
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
	public List<Technician> getAvailableTechnicians(String date) {
		// TODO Auto-generated method stub
		List<Technician> users=new ArrayList<>();
	    int isDeleted=1;
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_Type='Technician'");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Technician where User_ID="+rs.getInt(1));

				Technician user=new Technician();
				user.setUser_ID(rs.getString(1));
				user.setUser_Name(rs.getString(2));
				user.setUser_Surname(rs.getString(3)); 
				user.setUser_Email(rs.getString(4));
				user.setUser_Phone(rs.getString(5));
				user.setUser_Type(rs.getString(6));
				user.setUser_Address(rs.getString(7));
				user.setUser_Password(rs.getString(8));
				user.setDateAdded(rs.getString(9));
				
				ResultSet rsc=stmnt.executeQuery();
				while(rsc.next()) {
					PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.valueOf(rsc.getString(2)));
					isDeleted=Integer.valueOf(rsc.getString(3));
					ResultSet rss=stmnt2.executeQuery();
					while(rss.next()) {
						user.setService(rss.getString(2));
					}
				}
				if(isDeleted==0) {
				   users.add(user);
				}
			}
			List<Technician>tempusers=new ArrayList<>(users);
			PreparedStatement stmt3=connection.prepareStatement("SELECT * FROM Client where Client_ApDate='"+date+"'");
			ResultSet rs2=stmt3.executeQuery();
			while(rs2.next()) {
				for(Technician user:tempusers) {
					if(user.getUser_ID().equals(rs2.getString(6))) {
						users.remove(user);
					}
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	
}
