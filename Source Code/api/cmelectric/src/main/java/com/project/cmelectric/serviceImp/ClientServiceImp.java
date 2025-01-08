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
import com.project.cmelectric.model.Client;
import com.project.cmelectric.model.ClientTaskDates;
import com.project.cmelectric.model.Technician;
import com.project.cmelectric.model.Users;
import com.project.cmelectric.service.ClientService;

@Service
public class ClientServiceImp implements ClientService {
    Connection connection;
    public ClientServiceImp() {
    	connection=DBUtil.getConnection();
    }
	@Override
	public List<Client> getClients() {
			// TODO Auto-generated method stub
		    List<Client> users=new ArrayList<>();
			try {
				PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_Type='Client'");
				ResultSet rs=stmt.executeQuery();
				while(rs.next()) {
					PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where Client_ID+"+rs.getInt(1));

					Client user=new Client();
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
						user.setPaid(rsc.getString(3));
						user.setComplete(rsc.getString(4));
						user.setAppointmentDate(rsc.getString(5));
						user.setTechnician(rsc.getString(6));
						user.setAddress(rsc.getString(7));
						user.setBook_ID(rsc.getString(8));
						user.setInspection(rsc.getString(9));
						user.setTime(rsc.getString(10));
						user.setQuotation(rsc.getString(11));
						PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.valueOf(rsc.getString(2)));

						ResultSet rss=stmnt2.executeQuery();
						while(rss.next()) {
							user.setService(rss.getString(2));
							user.setPrice(rss.getString(3));
						}
					}
					users.add(user);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return users;
	}
	@Override
	public Client getClient(String ID) {
		// TODO Auto-generated method stub
		Client user=new Client();
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM User where User_Password='"+ID+"'");
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where Client_ID="+rs.getInt(1));

				
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

					ResultSet rss=stmnt2.executeQuery();
					while(rss.next()) {
						user.setService(rss.getString(2));
						user.setPrice(rss.getString(3));
					}
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return user;
	}
	@Override
	public boolean postBook(Client client) {
		// TODO Auto-generated method stub
		boolean added=false;
		 
		 try {
			 PreparedStatement stmnt2 = connection.prepareStatement("SELECT * FROM Service where Service_Type=?");
		        stmnt2.setString(1, client.getService());
				ResultSet rss=stmnt2.executeQuery();
				String service_id="";
				while(rss.next()) {
					service_id=rss.getString(1);
				}
			 
			 Statement stmt = connection.createStatement();
			 String query="insert into Client(Client_ID,Service_ID,isPaid,JobComplete,Client_ApDate,Client_Address) values('"+Integer.parseInt(client.getUser_ID())+"','"+Integer.parseInt(service_id)+"','"+0+"','"+0+"','"+client.getAppointmentDate()+"','"+client.getAddress()+"')";

//			Statement stmt2 = connection.createStatement();
			 int result = stmt.executeUpdate(query);
			 if(result!=0) {
				 added=true;
			 }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return added;	}
	@Override
	public List<Client> getBookID(String ID) {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where Client_ID="+Integer.parseInt(ID));
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public List<Client> getTechClient(String techID) {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where Client_Tech="+Integer.parseInt(techID));
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM user where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs2=stmnt3.executeQuery();
				while(rs2.next()) {
					user.setUser_ID(rs2.getString(1));
					user.setUser_Name(rs2.getString(2));
					user.setUser_Surname(rs2.getString(3)); 
					user.setUser_Email(rs2.getString(4));
					user.setUser_Phone(rs2.getString(5));
					user.setUser_Type(rs2.getString(6));
					user.setUser_Address(rs2.getString(7));
					user.setUser_Password(rs2.getString(8));
					user.setDateAdded(rs2.getString(9));
				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public boolean recordInspection(String book_ID,String inspection,String time) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "UPDATE client SET Inspection ='"+inspection+"',EstimatedTime='"+time+"' WHERE Book_ID = '"+Integer.parseInt(book_ID)+"'";

        // Step 3: Prepare the SQL statement with parameters
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
	public List<Client> getBookings() {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client");
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				user.setFeedback(rsc.getString(12));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public boolean assignTechnician(String Book_ID, String Client_Tech) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "UPDATE client SET Client_Tech ='"+Client_Tech+"' WHERE Book_ID = '"+Integer.parseInt(Book_ID)+"'";

        // Step 3: Prepare the SQL statement with parameters
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
	public List<Client> getUnassignedBookings() {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client WHERE Client_Tech IS NULL");
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public List<Client> getAssignedBookings(String Client_Tech) {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client WHERE Client_Tech="+Integer.parseInt(Client_Tech));
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				PreparedStatement stmnt4=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(6)));
				ResultSet rs2=stmnt4.executeQuery();
				while(rs2.next()) {
					user.setTechnician(rs2.getString(2)+" "+rs2.getString(3));

				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	
	@Override
	public Client getBooking(String book_ID) {
		// TODO Auto-generated method stub
		Client user=new Client();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client WHERE book_ID="+Integer.parseInt(book_ID));
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				if(rsc.getString(6)!=null) {
		    		PreparedStatement stmnt4=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(6)));
					ResultSet rs2=stmnt4.executeQuery();
					while(rs2.next()) {
						user.setTechnician(rs2.getString(2)+" "+rs2.getString(3));

					}
		        }
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return user;
	}
	@Override
	public Client getRecentBooking(String Client_ID) {
		// TODO Auto-generated method stub
		Client recentuser=new Client();
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where Client_ID="+Integer.parseInt(Client_ID));
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
		        if(rsc.getString(6)!=null) {
		    		PreparedStatement stmnt4=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(6)));
					ResultSet rs2=stmnt4.executeQuery();
					while(rs2.next()) {
						user.setTechnician(rs2.getString(2)+" "+rs2.getString(3));

					}
		        }
				users.add(user);
			}
			for(Client _client:users) {
				if(recentuser.getBook_ID()==null) {
					recentuser=_client;
				}
				else if(Integer.parseInt(recentuser.getBook_ID())<Integer.parseInt(_client.getBook_ID())) {
					recentuser=_client;
				}
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return recentuser;
	}
	@Override
	public boolean generateQuotation(String bookID, String Quotation) {
		// TODO Auto-generated method stub
				boolean added=false;
				String sql = "UPDATE client SET Quotation ='"+Quotation+"' WHERE Book_ID = '"+Integer.parseInt(bookID)+"'";

		        // Step 3: Prepare the SQL statement with parameters
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
	public boolean generatePayment(String bookID) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "UPDATE client SET isPaid =1 WHERE Book_ID = '"+Integer.parseInt(bookID)+"'";

        // Step 3: Prepare the SQL statement with parameters
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
	public boolean completeTask(String bookID) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "UPDATE client SET JobComplete =1 WHERE Book_ID = '"+Integer.parseInt(bookID)+"'";

        // Step 3: Prepare the SQL statement with parameters
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
	public boolean addFeedback(String bookID,String feedback) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "UPDATE client SET feedback ='"+feedback+"' WHERE Book_ID = '"+Integer.parseInt(bookID)+"'";

        // Step 3: Prepare the SQL statement with parameters
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
	public List<Client> getAllBooking() {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client");
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				user.setClienttaskdates(getTaskDate(rsc.getString(8)));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				PreparedStatement stmnt4=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(6)));
				ResultSet rs2=stmnt4.executeQuery();
				while(rs2.next()) {
					user.setTechnician(rs2.getString(2)+" "+rs2.getString(3));

				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public List<Client> getApprovedClients(String Client_Tech) {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where isPaid=1 AND JobComplete=0 And Client_Tech='"+Integer.parseInt(Client_Tech)+"'");
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				PreparedStatement stmnt4=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(6)));
				ResultSet rs2=stmnt4.executeQuery();
				while(rs2.next()) {
					user.setTechnician(rs2.getString(2)+" "+rs2.getString(3));

				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}
	@Override
	public boolean addTaskDate(String bookID, String date) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "insert into clienttaskdates (Book_ID,TaskDate) values('"+Integer.parseInt(bookID)+"','"+date+"')";

        // Step 3: Prepare the SQL statement with parameters
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
	public List<ClientTaskDates> getTaskDate(String bookID) {
		// TODO Auto-generated method stub
		List<ClientTaskDates> clientdates=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM clienttaskdates where Book_ID='"+Integer.parseInt(bookID)+"'");
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				ClientTaskDates clientdate=new ClientTaskDates();
				clientdate.setClienttask_ID(rsc.getString(1));
				clientdate.setBook_ID(rsc.getString(2));
				clientdate.setClienttaskdate(rsc.getString(3));
				clientdates.add(clientdate);
			}
		}
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return clientdates;
	}
	@Override
	public boolean removeTaskDate(String clienttask_ID) {
		// TODO Auto-generated method stub
		boolean added=false;
		String sql = "DELETE FROM clienttaskdates WHERE TaskDate_ID = '"+Integer.parseInt(clienttask_ID)+"'";

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
	public List<Client> getTechBooking(String TechID) {
		// TODO Auto-generated method stub
		List<Client> users=new ArrayList<>();
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Client where Client_Tech="+TechID);
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				Client user=new Client();
				
				user.setPaid(rsc.getString(3));
				user.setComplete(rsc.getString(4));
				user.setAppointmentDate(rsc.getString(5));
				user.setTechnician(rsc.getString(6));
				user.setAddress(rsc.getString(7));
				user.setBook_ID(rsc.getString(8));
				user.setInspection(rsc.getString(9));
				user.setTime(rsc.getString(10));
				user.setQuotation(rsc.getString(11));
				user.setClienttaskdates(getTaskDate(rsc.getString(8)));
				
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Service where Service_ID="+Integer.parseInt(rsc.getString(2)));
				ResultSet rss=stmnt2.executeQuery();
				while(rss.next()) {
					user.setService(rss.getString(2));
					user.setPrice(rss.getString(3));
				}
				PreparedStatement stmnt3=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(1)));
				ResultSet rs1=stmnt3.executeQuery();
				while(rs1.next()) {
					user.setUser_ID(rs1.getString(1));
					user.setUser_Name(rs1.getString(2));
					user.setUser_Surname(rs1.getString(3)); 
					user.setUser_Email(rs1.getString(4));
					user.setUser_Phone(rs1.getString(5));
					user.setUser_Type(rs1.getString(6));
					user.setUser_Address(rs1.getString(7));
					user.setUser_Password(rs1.getString(8));
					user.setDateAdded(rs1.getString(9));
				}
				PreparedStatement stmnt4=connection.prepareStatement("SELECT * FROM User where User_ID="+Integer.parseInt(rsc.getString(6)));
				ResultSet rs2=stmnt4.executeQuery();
				while(rs2.next()) {
					user.setTechnician(rs2.getString(2)+" "+rs2.getString(3));

				}
				users.add(user);
			}
		} 
		catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return users;
	}

}
