package com.ugotfilm.choice.dto;


import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChoiceDTO {
	
	private int max;
	private int min;
	private int ageGroup;
	private String gender;
}
