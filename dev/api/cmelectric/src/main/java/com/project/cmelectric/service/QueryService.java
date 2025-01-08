package com.project.cmelectric.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.project.cmelectric.model.Query;

@Repository
public interface QueryService {
	
	public boolean PostQuery(Query query);
	public List<Query> getQueries();
	public Query getQuery(String query_ID);
	public boolean response(String query_ID,String message);

}
