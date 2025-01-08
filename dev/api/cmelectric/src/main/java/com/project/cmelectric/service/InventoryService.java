package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.Inventory;
@Repository
public interface InventoryService {
   public boolean AddStock(Inventory item);
   public boolean UpdateStock(Inventory item,String Stock_ID);
   public List<Inventory> getStock(String category);
   public List<Inventory> getAllStock();
   boolean deleteStock(String ID);
}
