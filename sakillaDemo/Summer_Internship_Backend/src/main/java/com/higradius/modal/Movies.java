package com.higradius.modal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Table(name="film")
public class Movies {
	
	public Movies()
	{
		
	}
	@Id
	@Column(name="film_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	int filmId;
	@Column(name="title")
	String title;
	@Column(name="description")
	String description;
	@Column(name="release_year")
	String releaseYear;
	@Column(name="language_id")
	int language;


	public int getLanguage() {
		return language;
	}
	public void setLanguage(int language) {
		this.language = language;
	}
	@Column(name="director")
	String directorName;
	@Column(name="rating")
	String rating;
	@Column(name="special_features")
	String SpecialFeatures;
	//private Language languagePojo;
	
	
	
	/*
	 * @ManyToOne
	 * 
	 * @JoinColumn(name="language_id") public Language getLanguagePojo() {
	 * System.out.println("Getting Object"+languagePojo); return languagePojo; }
	 * public void setLanguagePojo(Language languagePojo) {
	 * 
	 * this.languagePojo = languagePojo;
	 * System.out.println("Setting Languge Pjo"+languagePojo); }
	 */
	
	
	
	int isDeleted;
	

	public int getIsDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getReleaseYear() {
		return releaseYear;
	}
	public void setReleaseYear(String releaseYear) {
		this.releaseYear = releaseYear;
	}

	public String getDirectorName() {
		return directorName;
	}
	public void setDirectorName(String directorName) {
		this.directorName = directorName;
	}
	public String getRating() {
		return rating;
	}
	public int getFilmId() {
		return filmId;
	}
	public void setFilmId(int filmId) {
		this.filmId = filmId;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public String getSpecialFeatures() {
		return SpecialFeatures;
	}
	public void setSpecialFeatures(String specialFeatures){
		this.SpecialFeatures = specialFeatures;
	}


}