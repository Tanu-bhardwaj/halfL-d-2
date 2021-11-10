package com.higradius.hibernate.Util;


import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.cfg.Configuration;


import com.higradius.modal.Movies;


@SuppressWarnings("deprecation")
public class hibernateUtil {
	
			public static SessionFactory getSessionFactory()
			{
				Configuration config = new Configuration().configure("hibernate.cfg.xml");
				config.addAnnotatedClass(Movies.class);
				
				SessionFactory sessionfactory = config.buildSessionFactory();
				return sessionfactory;
			}

			
	

		
	}