package com.highradius.DaoImpl;


import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

import com.highradius.DAO.Dao;
import com.higradius.hibernate.Util.hibernateUtil;
import com.higradius.modal.Movies;


public class DaoImpl implements Dao{
	public Long getTotalRows() {
		try {
			sessionFactory = hibernateUtil.getSessionFactory();
			Session session = sessionFactory.openSession();
			Query query=session.createQuery("SELECT COUNT(*) FROM Movies WHERE isDeleted=0");
			return (Long)query.uniqueResult();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	SessionFactory sessionFactory = null;
	
	private HashMap<String,Object> movieList = new HashMap<>();
	private ArrayList<Movies> movielist = new ArrayList<>();
	
	
	public HashMap<String,Object> searchFilm(Integer start,Integer limit,String Director,String Title,String releaseYear,Integer language)
	{
		sessionFactory = hibernateUtil.getSessionFactory();
		Session session = sessionFactory.openSession();
		Criteria criteria=session.createCriteria(Movies.class);
		criteria.add(Restrictions.eq("isDeleted",0));
		criteria.add(Restrictions.eq("directorName",Director));
		criteria.add(Restrictions.eq("title",Title));
		criteria.add(Restrictions.eq("releaseYear",releaseYear));
		criteria.add(Restrictions.eq("language",language));
		criteria.setFirstResult(start);
		criteria.setMaxResults(limit);
	
		
		 session.beginTransaction();
		  System.out.println("Session Completed");
		  List movies =  criteria.list();
		  
		  for(Iterator iterator = movies.iterator();iterator.hasNext();)
		  {
			  Movies movieiterator = (Movies)iterator.next();
			  Movies movie = new Movies();
			  movie.setDescription(movieiterator.getDescription());
			  movie.setDirectorName(movieiterator.getDirectorName());
			  movie.setFilmId(movieiterator.getFilmId());
			  movie.setLanguage(movieiterator.getLanguage());
			  movie.setRating(movieiterator.getRating());
			  movie.setReleaseYear(movieiterator.getReleaseYear());
			  movie.setTitle(movieiterator.getTitle());
			  movie.setSpecialFeatures(movieiterator.getSpecialFeatures());
			  movielist.add(movie);
		  }
		  
		  session.getTransaction().commit();
		  session.close();
		  sessionFactory.close();
		  
		  this.movieList.put("AllMovieData", movielist);
		  this.movieList.put("total",getTotalRows());
		 
		  return this.movieList;
	}
	@SuppressWarnings("rawtypes")
	public  HashMap<String, Object> getAllMovies(Integer start,Integer limit)
	{
		sessionFactory = hibernateUtil.getSessionFactory();
		Session session = sessionFactory.openSession();
		Criteria criteria=session.createCriteria(Movies.class);
		criteria.add(Restrictions.eq("isDeleted",0));
		criteria.setFirstResult(start);
		criteria.setMaxResults(limit);
	
		
		 session.beginTransaction();
		  System.out.println("Session Completed");
		  List movies =  criteria.list();
		  
		  for(Iterator iterator = movies.iterator();iterator.hasNext();)
		  {
			  Movies movieiterator = (Movies)iterator.next();
			  Movies movie = new Movies();
			  movie.setDescription(movieiterator.getDescription());
			  movie.setDirectorName(movieiterator.getDirectorName());
			  movie.setFilmId(movieiterator.getFilmId());
			  movie.setLanguage(movieiterator.getLanguage());
			  movie.setRating(movieiterator.getRating());
			  movie.setReleaseYear(movieiterator.getReleaseYear());
			  movie.setTitle(movieiterator.getTitle());
			  movie.setSpecialFeatures(movieiterator.getSpecialFeatures());
			  movielist.add(movie);
		  }
		  
		  
		  session.getTransaction().commit();
		  session.close();
		  sessionFactory.close();
		  System.out.println(this.movieList);
		  this.movieList.put("AllMovieData", movielist);
		  this.movieList.put("total",getTotalRows());
		 
		  return this.movieList;
	}
	public  HashMap<String,Object>  addMovie(Movies movie) 
		{
		
			/*
			 * System.out.println(title); System.out.println(language); Movies movie = new
			 * Movies(); movie.setTitle(title); movie.setDescription(description);
			 * movie.setDirectorName(directorName); movie.setRating(rating);
			 * movie.setLanguage(language); movie.setReleaseYear(releaseYear);
			 * movie.setSpecialFeatures(specialFeatures);
			 * System.out.println("Data base is trying to open a session");
			 */
		
		try {
			sessionFactory = hibernateUtil.getSessionFactory();
			Session session = sessionFactory.openSession();
			 session.beginTransaction();
			  System.out.println("Session Completed");
			  session.save(movie);
			  System.out.println("Inserted Successfully");
			  session.getTransaction().commit();
			  session.close();
			  sessionFactory.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("An Exception Occured" + e);
			//e.printStackTrace();
		}
		
		
		return  this.movieList;
		 
		
	}
	
	
	public HashMap<String,Object>  updateMovie(Movies movie)  
	{
	try {
		sessionFactory = hibernateUtil.getSessionFactory();
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		/*
		 * Movies movie = (Movies)session.get(Movies.class, filmId);
		 * movie.setTitle(title); movie.setDescription(description);
		 * movie.setDirectorName(directorName); movie.setRating(rating);
		 * movie.setLanguage(language); movie.setReleaseYear(releaseYear);
		 * movie.setSpecialFeatures(specialFeatures);
		 */
		 session.update(movie);
		 
;		  System.out.println("updated Successfully");
		  session.getTransaction().commit();
		  System.out.println("Commited");
		  session.close();
		  sessionFactory.close();
		
		
	} 
	catch (Exception e) 
	{
		System.out.println("An exception Occured" + e);
	} 
	
	return this.movieList;
}
	
	public   HashMap<String,Object>  deleteMovie(int filmIds) 
	{
		System.out.println(filmIds);
		try {
			sessionFactory = hibernateUtil.getSessionFactory();
			Session session = sessionFactory.openSession();
			session.beginTransaction();
			Movies movie = (Movies)session.get(Movies.class, filmIds);
			System.out.println(filmIds);
			Query query = session.createQuery("UPDATE Movies SET isDeleted = 1 WHERE film_id = :filmId");
			query.setInteger("filmId", filmIds);
			
			query.executeUpdate();
	;		  
			  session.getTransaction().commit();
			  session.close();
			  sessionFactory.close();
			  System.out.println("Deleted Successfully");
		} catch (Exception e) {
			e.printStackTrace();
			
		} 
		
		
		return this.movieList;
	}
	
}