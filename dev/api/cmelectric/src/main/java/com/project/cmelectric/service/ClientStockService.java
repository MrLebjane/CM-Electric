package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.ClientStock;
import com.project.cmelectric.model.Inventory;

@Repository
public interface ClientStockService {
  public boolean postClientStock(ClientStock clientstock);
  public boolean deleteClientStock(String clientStock_ID);
  public List<ClientStock> getStock(String client_ID);
}
