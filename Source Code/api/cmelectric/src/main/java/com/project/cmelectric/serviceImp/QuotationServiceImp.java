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
import com.project.cmelectric.model.Quotation;
import com.project.cmelectric.model.Quotationproducts;
import com.project.cmelectric.service.ClientService;
import com.project.cmelectric.service.QuotationService;
@Service
public class QuotationServiceImp implements QuotationService {
	Connection connection;
	
    public QuotationServiceImp() {
    	connection=DBUtil.getConnection();
    }
	@Override
	public Quotation getQuotation(String bookid) {
		// TODO Auto-generated method stub
		Quotation quote=new Quotation();
		ClientServiceImp clientservice=new ClientServiceImp();
		
		Client client=clientservice.getBooking(bookid);
		quote.setDateAdded(client.getDateAdded());
		
		try {
			PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Quotation where Quotation_ID="+Integer.parseInt(client.getQuotation()));
			ResultSet rsc=stmnt.executeQuery();
			while(rsc.next()) {
				PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Quotationproducts where Quotation_ID="+Integer.parseInt(rsc.getString(1)));
				quote.setQuotation_ID(rsc.getString(1));
				quote.setService_Type(rsc.getString(2));
				quote.setService_Fee(rsc.getString(3));
				quote.setGrandtotal(rsc.getString(4));
				ResultSet rss=stmnt2.executeQuery();
				List<Quotationproducts> qp=new ArrayList<>();
				while(rss.next()) {
					Quotationproducts _qp=new Quotationproducts();
					_qp.setProduct_name(rss.getString(3));
					_qp.setProduct_brand(rss.getString(4));
					_qp.setProduct_capacity(rss.getString(5));
					_qp.setQuantity(rss.getString(6));
					_qp.setPrice(rss.getString(7));
					qp.add(_qp);
				}
				quote.setQP(qp);
			}
		}catch(SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return quote;
	}

	@Override
	public boolean postQuotation(String bookID,Quotation quotation) {
		// TODO Auto-generated method stub
		ClientServiceImp clientservice=new ClientServiceImp();
		boolean posted=false;
		String _query="insert into Quotation(service_type,Service_fee,grandtotal) values('"+quotation.getService_Type()+"','"+quotation.getService_Fee()+"','"+quotation.getGrandtotal()+"')";
		 PreparedStatement stmt;
		try {
			 stmt = connection.prepareStatement(_query,Statement.RETURN_GENERATED_KEYS);
			 int result = stmt.executeUpdate();
			 
			 if(result>0) {
				 int primaryKey=0;
				 try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
			            if (generatedKeys.next()) {
			                  primaryKey = generatedKeys.getInt(1);
			                }
			            }
				 System.out.println(primaryKey);
				 clientservice.generateQuotation(bookID, ""+primaryKey+"");
				 for(Quotationproducts QP:quotation.getQP()) {
					 Statement stmt1 = connection.createStatement();
					 String _query1="insert into quotationproducts(Quotation_ID,product_name,product_brand,product_capacity,quantity,price) values("+primaryKey+",'"+QP.getProduct_name()+"','"+QP.getProduct_brand()+"','"+QP.getProduct_capacity()+"','"+QP.getQuantity()+"','"+QP.getPrice()+"')";
					 stmt1.executeUpdate(_query1);
				 }
				 posted= true;
			 }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return posted;
	}
	@Override
	public List<Quotation> getQuotations() {
		// TODO Auto-generated method stub
		List<Quotation> quotations=new ArrayList<>();
		
		ClientServiceImp clientservice=new ClientServiceImp();
		
		List<Client> clients=clientservice.getBookings();
		for(Client client:clients) {
			Quotation quote=new Quotation();
			quote.setDateAdded(client.getDateAdded());
			if(client.getQuotation()!=null) {

				try {
					PreparedStatement stmnt=connection.prepareStatement("SELECT * FROM Quotation where Quotation_ID="+Integer.parseInt(client.getQuotation()));
					ResultSet rsc=stmnt.executeQuery();
					while(rsc.next()) {
						PreparedStatement stmnt2=connection.prepareStatement("SELECT * FROM Quotationproducts where Quotation_ID="+Integer.parseInt(rsc.getString(1)));
						quote.setQuotation_ID(rsc.getString(1));
						quote.setService_Type(rsc.getString(2));
						quote.setService_Fee(rsc.getString(3));
						quote.setGrandtotal(rsc.getString(4));
						ResultSet rss=stmnt2.executeQuery();
						List<Quotationproducts> qp=new ArrayList<>();
						while(rss.next()) {
							Quotationproducts _qp=new Quotationproducts();
							_qp.setProduct_name(rss.getString(3));
							_qp.setProduct_brand(rss.getString(4));
							_qp.setProduct_capacity(rss.getString(5));
							_qp.setQuantity(rss.getString(6));
							_qp.setPrice(rss.getString(7));
							qp.add(_qp);
						}
						quote.setQP(qp);
					}
				}catch(SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			quotations.add(quote);
		}
		return quotations;
	}

}
