package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.Client;
import com.project.cmelectric.model.ClientTaskDates;

@Repository
public interface ClientService {
  public List<Client> getClients();
  public Client getClient(String ID);
  public boolean postBook(Client Client);
  public List<Client> getBookID(String ID);
  List<Client> getBookings();
  public List<Client> getTechClient(String techID);
  public boolean recordInspection(String book_ID,String inspection,String time);
  public boolean assignTechnician(String Book_ID,String Client_Tech);
  public List<Client> getApprovedClients(String Client_Tech);
  public List<Client> getUnassignedBookings();
  public List<Client> getAssignedBookings(String Client_Tech);
  public Client getBooking(String  book_ID);
  public List<Client> getAllBooking();
  public List<Client> getTechBooking(String TechID);
  public Client getRecentBooking(String Client_ID);
  public boolean generateQuotation(String bookID,String Quotation);
  public boolean generatePayment(String bookID);
  public boolean completeTask(String bookID);
  public boolean addFeedback(String bookID,String feedback);
  public boolean addTaskDate(String bookID,String date);
  public List<ClientTaskDates> getTaskDate(String bookID);
  public boolean removeTaskDate(String clienttask_ID);
}
