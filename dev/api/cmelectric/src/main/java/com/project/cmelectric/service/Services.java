package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.ServiceType;

@Repository
public interface Services {
    List<ServiceType> getServices();
    boolean AddService(ServiceType service);
    boolean updateStock(String ID,String Service_fee);
}
