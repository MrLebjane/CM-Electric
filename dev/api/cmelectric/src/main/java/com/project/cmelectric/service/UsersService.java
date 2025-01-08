package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.Client;
import com.project.cmelectric.model.Technician;
import com.project.cmelectric.model.Users;

@Repository
public interface UsersService {
    public List<Users> getUserData();
    public boolean postTechnician(Technician user);
    public boolean postClient(Users user);
    public Users getUser(String password);
    public Users getUserE(String email);
    public boolean updateDetails(Users user,String user_ID);
}
