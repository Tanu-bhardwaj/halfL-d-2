package com.highradius.ManagerImpl;

import java.util.HashMap;

import com.highradius.DAO.Dao;
import com.highradius.Manager.manager;
import com.higradius.modal.Movies;

public class MovieManager implements manager{
	
	private Dao dao;
	
	public Dao getDao() {
		System.out.println("Getting dao");
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	public HashMap<String,Object> getAllMovies(Integer start,Integer limit)
	{
		
		return dao.getAllMovies(start, limit);
		
	}
	
	public HashMap<String,Object> addMovie(Movies movie)
	{
		return dao.addMovie(movie);
	}

	public HashMap<String,Object> updateMovie(Movies obj)
	{
		return dao.updateMovie(obj);
	}

	public HashMap<String,Object> deleteMovie(int filmId)
	{
		return dao.deleteMovie(filmId);
	}

	public HashMap<String,Object> searchFilm(Integer start,Integer limit,String Director,String Title,String releaseYear,Integer language)
	{
		return dao.searchFilm(start,limit,Director,Title,releaseYear,language);
	}


	
}