package com.project.cmelectric.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.cmelectric.model.Client;
import com.project.cmelectric.model.ClientStock;
import com.project.cmelectric.model.ClientTaskDates;
import com.project.cmelectric.model.Inventory;
import com.project.cmelectric.model.Query;
import com.project.cmelectric.model.Quotation;
import com.project.cmelectric.model.ServiceType;
import com.project.cmelectric.model.Technician;
import com.project.cmelectric.model.Users;
import com.project.cmelectric.service.ClientService;
import com.project.cmelectric.service.ClientStockService;
import com.project.cmelectric.service.InventoryService;
import com.project.cmelectric.service.QueryService;
import com.project.cmelectric.service.QuotationService;
import com.project.cmelectric.service.Services;
import com.project.cmelectric.service.TechnicianService;
import com.project.cmelectric.service.UsersService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UsersService userservice;
	@Autowired
	private QueryService queryservice;
	@Autowired
	private ClientService clientservice;
	@Autowired
	private TechnicianService technicianservice;
	@Autowired
	private InventoryService inventoryservice;
	@Autowired
	private ClientStockService clientstockservice;
	@Autowired
	private Services services;
	@Autowired
	private QuotationService quotationservice;
	
	@GetMapping("/getusers")
	public List<Users> getUsers(){
		return userservice.getUserData();
	}
	@GetMapping("/getuser/{reference}")
	public Users getUser(@PathVariable String reference) {
		return userservice.getUser(reference);
	}
	@GetMapping("/getuseremail/{email}")
	public Users getUserE(@PathVariable String email) {
		return userservice.getUserE(email);
	}
	@PostMapping("/addtechnician")
	public boolean postTechnician(@RequestBody Technician user ) {
		return userservice.postTechnician(user);
	}
	@PostMapping("/addclient")
	public boolean postClient(@RequestBody Users user ) {
		return userservice.postClient(user);
	}
	@PostMapping("/addclienttaskdate/{Book_ID}")
	public boolean addTaskDate(@PathVariable String Book_ID,@RequestBody Map<String,String>taskdate ) {
		String date=taskdate.get("taskdate");
		return clientservice.addTaskDate(Book_ID, date);
	}
	@GetMapping("/getclienttaskdate/{Book_ID}")
	public List<ClientTaskDates> getClientTaskDates(@PathVariable String Book_ID) {
		return clientservice.getTaskDate(Book_ID);
	}
	@GetMapping("/getclients")
	public List<Client> getClients() {
		return clientservice.getClients();
	}
	@GetMapping("/getclient/{ID}")
	public Client getClient(@PathVariable String ID) {
		return clientservice.getClient(ID);
	}
	@GetMapping("/gettechnicians")
	public List<Technician> getTechnicians() {
		return technicianservice.getTechnicians();
	}
	@GetMapping("/gettechnician/{ID}")
	public Technician getTechnician(@PathVariable String ID) {
		return technicianservice.getTechnician(ID);
	}
	@PostMapping("/postbook")
	public boolean postBook(@RequestBody Client client) {
		return clientservice.postBook(client);
	}
	@GetMapping("/getuserbookings/{ID}")
	public List<Client> getBookID(@PathVariable String ID) {
		return clientservice.getBookID(ID);
	}
	@GetMapping("/getuserbooking/{ID}")
	public Client getBooking(@PathVariable String ID) {
		return clientservice.getBooking(ID);
	}
	@GetMapping("/getrecentbooking/{Client_ID}")
	public Client getRecentBooking(@PathVariable String Client_ID) {
		return clientservice.getRecentBooking(Client_ID);
	}
	@GetMapping("/getallbookings")
	public List<Client> getBookings() {
		return clientservice.getBookings();
	}
	@GetMapping("/getcalbookings")
	public List<Client> getAllBookings() {
		return clientservice.getAllBooking();
	}
	@GetMapping("/gettechcalbookings/{TechID}")
	public List<Client> getTechBookings(@PathVariable String TechID) {
		return clientservice.getTechBooking(TechID);
	}
	@GetMapping("/getunassignedbookings")
	public List<Client> getUnassignedBookings() {
		return clientservice.getUnassignedBookings();
	}
	@GetMapping("/getassignedbookings/{Client_Tech}")
	public List<Client> getAssignedBookings(@PathVariable String Client_Tech) {
		return clientservice.getAssignedBookings(Client_Tech);
	}
	//Mobile
	@GetMapping("/gettechclients/{techID}")
	public List<Client>getTechClient(@PathVariable String techID){
		return clientservice.getTechClient(techID);
	}
	@GetMapping("/getapprovedclients/{techID}")
	public List<Client> getapprovedclients(@PathVariable String techID) {
		return clientservice.getApprovedClients(techID);
	}
	@PutMapping("/recordinspection/{id}")
    public boolean recordInspection(@PathVariable String id, @RequestBody Map<String,String>inspectiondeatils) {
		String inspection=inspectiondeatils.get("Inspection");
		String time=inspectiondeatils.get("time");
	   return clientservice.recordInspection(id, inspection,time);
    }
	@PutMapping("/assigntech/{bookid}")
    public boolean assignTechnician(@PathVariable String bookid, @RequestBody String TechId) {
	   return clientservice.assignTechnician(bookid, TechId);
    }
	@GetMapping("/getqueries")
	public List<Query> getQueries(){
		return queryservice.getQueries();
	}
	@PostMapping("/addquery")
	public boolean postQuery(@RequestBody Query query) {
		return queryservice.PostQuery(query);
	}
	@GetMapping("/getquery/{query_ID}")
	public Query getQuery(@PathVariable String query_ID){
		return queryservice.getQuery(query_ID);
	}
	@PutMapping("/postresponse/{query_ID}")
	public boolean postresponse(@PathVariable String query_ID,@RequestBody String message){
		return queryservice.response(query_ID,message);
	}
	
	@PostMapping("/addstock")
	public boolean postitem(@RequestBody Inventory item) {
		return inventoryservice.AddStock(item);
	}
	@GetMapping("/getstock/{category}")
	public List<Inventory> getStock(@PathVariable String category){
		return inventoryservice.getStock(category);
	}
	@GetMapping("/getallstock")
	public List<Inventory> getAllStock(){
		return inventoryservice.getAllStock();
	}
	@PostMapping("/addclientstock")
	public boolean postitem(@RequestBody ClientStock clientstock) {
		return clientstockservice.postClientStock(clientstock );
	}
	@GetMapping("/getclientstock/{Client_ID}")
	public List<ClientStock> getAllStock(@PathVariable String Client_ID){
		return clientstockservice.getStock(Client_ID);
	}
	@PostMapping("/addservices")
	public boolean postservice(@RequestBody ServiceType serviceType) {
		return services.AddService(serviceType);
	}
	@GetMapping("/getservices")
	public List<ServiceType> getServices(){
		return services.getServices();
	}
	@PutMapping("/generatequotation/{book_ID}")
	public boolean postquotation(@PathVariable String book_ID,@RequestBody Map<String,String> quotation){
		String _quotation=quotation.get("Quotation");
		return clientservice.generateQuotation(book_ID, _quotation);
	}
	@GetMapping("/getquotations")
	public List<Quotation> getQuoation(){
		return quotationservice.getQuotations();
	}
	@GetMapping("/getquotation/{book_ID}")
	public Quotation getQuoation(@PathVariable String book_ID){
		return quotationservice.getQuotation(book_ID);
	}
	@PostMapping("/addquotation/{book_ID}")
	public boolean postquotation(@PathVariable String book_ID,@RequestBody Quotation quotation) {
		return quotationservice.postQuotation(book_ID, quotation);
	}
	@PutMapping("/completetask/{book_ID}")
	public boolean completetask(@PathVariable String book_ID){
		return clientservice.completeTask(book_ID);
	}
	@PutMapping("/generatepayment/{book_ID}")
	public boolean generatepayment(@PathVariable String book_ID){
		return clientservice.generatePayment(book_ID);
	}
	
	@DeleteMapping("/deletetechnician/{ID}")
	public boolean deleteTechnician(@PathVariable String ID) {
		return technicianservice.removeTechnician(ID);
	}
	@PutMapping("/deletestock/{ID}")
	public boolean deletestock(@PathVariable String ID){
		return inventoryservice.deleteStock(ID);
	}
	@PutMapping("/updateservice/{ID}")
	public boolean updateservice(@PathVariable String ID,@RequestBody Map<String,String> service_Fee){
		String _service_Fee=service_Fee.get("service_Fee");
		return services.updateStock(ID, _service_Fee);
	}
	@PutMapping("/updatestock/{ID}")
	public boolean updatestock(@RequestBody Inventory inventory,@PathVariable String ID){
		return inventoryservice.UpdateStock(inventory, ID);
	}
	@PutMapping("/updateuser/{ID}")
	public boolean updateuser(@RequestBody Users user,@PathVariable String ID){
		return userservice.updateDetails(user, ID);
	}
	@DeleteMapping("/deleteclientstock/{ID}")
	public boolean deleteclientstock(@PathVariable String ID){
		return clientstockservice.deleteClientStock(ID);
	}
	@GetMapping("/getavailabletechnicians/{date}")
	public List<Technician> getAvailableTechnicians(@PathVariable String date){
		return technicianservice.getAvailableTechnicians(date);
	}
	@DeleteMapping("/deletetaskdate/{clienttask_ID}")
	public boolean removetaskdate(@PathVariable String clienttask_ID){
		return clientservice.removeTaskDate(clienttask_ID);
	}
	// add feedback
	@PutMapping("/addfeedback/{bookID}")
	public boolean addfeedback(@PathVariable String bookID,@RequestBody Map<String,String> feedback){
		String _feedback=feedback.get("feedback");
		return clientservice.addFeedback(bookID, _feedback);
	}
}
