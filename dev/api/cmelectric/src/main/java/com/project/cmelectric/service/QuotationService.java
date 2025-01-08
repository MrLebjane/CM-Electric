package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.Quotation;

@Repository
public interface QuotationService {
  public Quotation getQuotation(String bookid);
  public boolean postQuotation(String bookID,Quotation quotation);
  public List<Quotation> getQuotations();
}
