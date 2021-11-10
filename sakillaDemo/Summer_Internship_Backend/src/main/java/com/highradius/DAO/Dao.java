package com.highradius.DAO;

import java.util.HashMap;

import com.higradius.modal.Movies;

public interface Dao {
	
	//public Integer getLanguageId(String languageName);
	//public Long getTotalRows();
	
	
	public HashMap<String,Object> getAllMovies(Integer start,Integer limit);
  public HashMap<String,Object> updateMovie(Movies obj);
	public HashMap<String,Object> addMovie(Movies Obj);
	public HashMap<String,Object> deleteMovie(int filmId);
	public HashMap<String,Object> searchFilm(Integer start,Integer limit,String Director,String Title,String releaseYear,Integer language);
	
	//public HashMap<String,Object> getLanguageData();
	
}