package com.ugotfilm.choice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;
import com.ugotfilm.login.dto.UserDTO;


@Service
public interface ChoiceService {
	public List<MovieDTO> genderProcess(int num) throws Exception; 
	public List<MovieDTO> genreProcess(int num) throws Exception;
	
	// 성별로 검색
	public GenreDTO bestGenderGenre(UserDTO user) throws Exception;
	public List<MovieDTO> bestGenderMovie(UserDTO user) throws Exception;
	public PersonDTO bestGenderDirector(UserDTO user) throws Exception;
	public PersonDTO bestGenderCast(UserDTO user) throws Exception;
	
	// 연령대로 검색
	public GenreDTO bestBirthGenre(ChoiceDTO dto) throws Exception;
	public List<MovieDTO> bestBirthMovie(ChoiceDTO dto) throws Exception;
	public PersonDTO bestBirthDirector(ChoiceDTO dto) throws Exception;
	public PersonDTO bestBirthCast(ChoiceDTO dto) throws Exception;
	
	// 전체로 검색
	public GenreDTO bestGenre() throws Exception;
	public List<MovieDTO> bestMovie() throws Exception;
	public PersonDTO bestDirector() throws Exception;
	public PersonDTO bestCast() throws Exception;
}
