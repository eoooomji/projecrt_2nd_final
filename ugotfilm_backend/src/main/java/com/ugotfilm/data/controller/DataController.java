package com.ugotfilm.data.controller;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.ModelAttribute;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ugotfilm.data.dto.DataDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.service.DataService;


@RestController
public class DataController {
	//저장할때는 DataDTO를 사용하고
	//안에서 관리할때는 GenreDTO, MovieDTO, PersonDTO를 사용한다.
	
	
	@Autowired
	private DataService service;

	public DataController() {

	}	

	//영화 장르 정보 저장
	@PostMapping("/save/detail/movieinfo")
	public String saveMovieInfoMethod(DataDTO data, MovieDTO dto) throws Exception{
		JsonParser parser = new JsonParser();
		
		//영화 정보 저장---------------------------------------------------------------
		System.out.println("영화 정보 저장 시작");
		String movie = data.getMovie();
		System.out.println("영화정보 : " + movie);
		JsonObject movieobject = (JsonObject) parser.parse(movie);
			dto.setMoviecode(movieobject.get("id").getAsInt());
			if(!(movieobject.get("poster").isJsonNull())) {
				dto.setPoster_url(movieobject.get("poster").getAsString());
			}
			dto.setTitle(movieobject.get("title").getAsString());
			dto.setUsercode(data.getUsercode());
		
		//영화 정보 저장
		service.saveMovieProcess(dto);

		//영화 클릭 정보 저장
		service.choiceMovieProcess(dto);
		
		//장르 정보 저장-----------------------------------------------------
		System.out.println("장르 정보 저장 시작");
		String genrelist = data.getGenrelist();
//		System.out.println("장르리스트 : " +genrelist);
		JsonArray genrejsonArray = (JsonArray) parser.parse(genrelist);

		for(int i=0;i<genrejsonArray.size();i++) {
			JsonObject object = (JsonObject) genrejsonArray.get(i);
			GenreDTO genreDto = new GenreDTO();
				genreDto.setGenrecode(object.get("id").getAsInt());
				genreDto.setName(object.get("name").getAsString());
				genreDto.setUsercode(data.getUsercode());
				genreDto.setMoviecode(dto.getMoviecode());
			
			//장르 저장
			service.saveGenreProcess(genreDto);
			
			//장르 클릭 저장
			service.choiceGenreProcess(genreDto);
		}
		return "영화 장르 데이터 저장완료";
	}
	
	//감독 배우 정보 저장
	@PostMapping("/save/detail/creditinfo")
	public String saveCreditInfoMethod(DataDTO data, PersonDTO dto) throws Exception{
		JsonParser parser = new JsonParser();
		//감독 정보 저장------------------------------------
		System.out.println("감독 정보 저장");
		String director = data.getDirector();
//		System.out.println("영화정보 : " + movie);
		JsonObject movieobject = (JsonObject) parser.parse(director);
			dto.setPersoncode(movieobject.get("id").getAsInt());
			if(!(movieobject.get("profile").isJsonNull())) {
				dto.setProfile_url(movieobject.get("profile").getAsString());
			}
			dto.setName(movieobject.get("name").getAsString());
			dto.setUsercode(data.getUsercode());
		
		//감독 정보 저장
		service.saveCrewProcess(dto);
		//감독 클릭 정보 저장
		service.choiceCrewProcess(dto);
		

		//배우 정보 저장----------------------------------------
		System.out.println("배우 정보 저장");
		String cast = data.getCastlist();
		System.out.println("배우리스트 : " +cast);
		JsonArray jsonArray = (JsonArray) parser.parse(cast);
		System.out.println(jsonArray);
		
		for(int i=0;i<jsonArray.size();i++) {
			JsonObject object = (JsonObject) jsonArray.get(i);
			PersonDTO castDto = new PersonDTO();
				castDto.setPersoncode(object.get("id").getAsInt());
				castDto.setName(object.get("name").getAsString());
				if(!(object.get("profile").isJsonNull())) {
					castDto.setProfile_url(object.get("profile").getAsString());
				}
				castDto.setJob(object.get("job").getAsString());
				castDto.setUsercode(data.getUsercode());

			switch(castDto.getJob()) {
				case "Directing":
					service.saveCrewProcess(castDto);
					service.choiceCrewProcess(castDto);
					break;
				case "Acting":
					service.saveCastProcess(castDto);
					service.choiceCastProcess(castDto);
					break;
				default:
					return "인물 상세페이지 데이터 저장 안함";
			}
			//배우 저장
			service.saveCastProcess(castDto);
			//배우 클릭 저장
			service.choiceCastProcess(castDto);
			
		}
		
		return "감독 배우 데이터 저장완료";
	}
	
	//인물상세 정보 페이지 저장
	@PostMapping("/save/person")
	public String savePersonMethod(DataDTO data, PersonDTO dto) throws Exception {
		JsonParser parser = new JsonParser();
		//감독 정보 저장------------------------------------
		System.out.println("인물 정보 저장");
		String person = data.getPerson();
		System.out.println("인물정보 : " + person);
		JsonObject object = (JsonObject) parser.parse(person);
			dto.setPersoncode(object.get("id").getAsInt());
			if(!(object.get("profile").isJsonNull())) {
				dto.setProfile_url(object.get("profile").getAsString());
			}
			dto.setName(object.get("name").getAsString());
			dto.setJob(object.get("job").getAsString());
			dto.setUsercode(data.getUsercode());

		//인물정보 저장 및 선택 정보 저장
		switch(dto.getJob()) {
		case "Directing":
			service.saveCrewProcess(dto);
			service.choiceCrewProcess(dto);
			break;
		case "Acting":
			service.saveCastProcess(dto);
			service.choiceCastProcess(dto);
			break;
		default:
			return "인물 상세페이지 데이터 저장 안함";
		}

		return "인물 상세페이지 데이터 저장 완료";
	}
	
}// end class
