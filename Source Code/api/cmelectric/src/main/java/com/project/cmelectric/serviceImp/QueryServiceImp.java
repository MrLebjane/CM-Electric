package com.project.cmelectric.serviceImp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cmelectric.DBUtil.DBUtil;
import com.project.cmelectric.model.Query;
import com.project.cmelectric.model.Users;
import com.project.cmelectric.service.EmailService;
import com.project.cmelectric.service.QueryService;

@Service
public class QueryServiceImp implements QueryService {
	Connection connection;
	@Autowired
    EmailService emailservice;
    public QueryServiceImp() {
   	 connection=DBUtil.getConnection();
    }
    @Override
	public boolean PostQuery(Query query) {
		// TODO Auto-generated method stub
		boolean posted=false;
		String _query="insert into Query(Query_Name,Query_Email,Query_Subject,Query_Message) values('"+query.getUser_Name()+"','"+query.getUser_Email()+"','"+query.getSubject()+"','"+query.getMessage()+"')";
		 Statement stmt;
		try {
			 stmt = connection.createStatement();
			 int result = stmt.executeUpdate(_query);
			 if(result>0)
				 posted= true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return posted;
	}

	@Override
	public List<Query> getQueries() {
		// TODO Auto-generated method stub
		List<Query>queries= new ArrayList<>();
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM Query");
			ResultSet rs=stmt.executeQuery();
			
			while(rs.next()) {
				Query query=new Query();
				query.setQuery_ID(rs.getString(1));
				query.setUser_Name(rs.getString(2));
				query.setUser_Email(rs.getString(3));
				query.setSubject(rs.getString(4));
				query.setMessage(rs.getString(5));
				query.setDate(rs.getString(6));
				queries.add(query);
		    }
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return queries;	
    
	}
	@Override
	public Query getQuery(String query_ID) {
		// TODO Auto-generated method stub
		Query query=new Query();
		try {
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM Query where Query_ID="+Integer.valueOf(query_ID));
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				
				query.setQuery_ID(rs.getString(1));
				query.setUser_Name(rs.getString(2));
				query.setUser_Email(rs.getString(3));
				query.setSubject(rs.getString(4));
				query.setMessage(rs.getString(5));
				query.setDate(rs.getString(6));
		    }
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return query;	
	}
	@Override
	public boolean response(String query_ID,String message) {
		// TODO Auto-generated method stub
		try {
			String email=null;
		    String subject=null;
		    
			PreparedStatement stmt=connection.prepareStatement("SELECT * FROM Query where Query_ID="+Integer.valueOf(query_ID));
			ResultSet rs=stmt.executeQuery();
			while(rs.next()) {
				email=rs.getString(3);
				subject=rs.getString(4);
		    }
			emailservice.sendEmail(email.trim(),subject, message);
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

}
