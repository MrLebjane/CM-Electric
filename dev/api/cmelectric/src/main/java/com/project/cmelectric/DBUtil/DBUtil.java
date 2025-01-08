package com.project.cmelectric.DBUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
   private static Connection connection=null;
   
   public static Connection getConnection() {
	   if(connection!=null) {
		   return connection;
	   }
	   else {
		   //com.mysql.cj.jdbc.Driver
		   String driver="com.mysql.cj.jdbc.Driver";
		   String url="jdbc:mysql://localhost:3306/cmelectric?useSSL=false";
		   String user="root";
		   String password="Lebjane05@mysql";
		   try {
			Class.forName(driver);
			connection=DriverManager.getConnection(url,user,password);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		   
	   }
	   return connection;
   }
}
