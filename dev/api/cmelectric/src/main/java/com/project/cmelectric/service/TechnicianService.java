package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.Technician;

@Repository
public interface TechnicianService {
	List<Technician> getTechnicians();
	Technician getTechnician(String ID);
	boolean removeTechnician(String ID);
	List<Technician> getAvailableTechnicians(String date);

}
