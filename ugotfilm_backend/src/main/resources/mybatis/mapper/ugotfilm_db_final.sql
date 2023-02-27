-- 회원 정보 테이블
drop table ugotfilm_user;

create table ugotfilm_user(
	usercode number primary key, -- 유저 고유 번호
	username varchar2(1000), -- 유저 아이디
	password varchar2(1000), -- 유저 비밀번호
	nickname varchar2(1000), -- 유저 닉네임
	joindate Date, -- 유저 가입날짜
	gender varchar2(10), -- 유저 성별 '남', '여'
	birth	number, -- 유저 출생년도
	authRole varchar2(100) -- 유저 포지션
);

-- 회원 유저코드 시퀀스

DROP SEQUENCE ugotfilm_user_usercode_seq;

create sequence ugotfilm_user_usercode_seq start with 1 increment by 1 nocache nocycle;

-- 회원 정보 샘플

insert into ugotfilm_user values (ugotfilm_user_usercode_seq.nextval, 'user1', '123', 'nick1', sysdate, '남', 1996, 'ROLE_MEMBER');
insert into ugotfilm_user values (ugotfilm_user_usercode_seq.nextval, 'user2', '123', 'nick2', sysdate, '여', 1996, 'ROLE_MEMBER');

SELECT * FROM ugotfilm_user;

-- 영화 정보 테이블
drop table ugotfilm_movie;

create table ugotfilm_movie(
	moviecode NUMBER, -- 영화 고유 번호
	title varchar2(300), -- 영화 제목
	poster_url varchar2(100) -- 영화 포스터 url
);

-- 영화 정보 샘플

insert into ugotfilm_movie values (505642, '블랙 팬서: 와칸다 포에버', 'url');

SELECT * FROM ugotfilm_movie;

-- 장르 정보 테이블
drop table ugotfilm_genre;

create table ugotfilm_genre(
	genrecode NUMBER PRIMARY KEY, -- 장르 코드
	name varchar2(100) -- 장르 이름
);

insert into ugotfilm_genre VALUES (28, '액션');
insert into ugotfilm_genre VALUES (12, '모험');
insert into ugotfilm_genre VALUES (16, '애니메이션');
insert into ugotfilm_genre VALUES (35, '코미디');
insert into ugotfilm_genre VALUES (53, '스릴러');
insert into ugotfilm_genre VALUES (80, '범죄');
insert into ugotfilm_genre VALUES (18, '드라마');
insert into ugotfilm_genre VALUES (99, '다큐멘터리');
insert into ugotfilm_genre VALUES (10751, '가족');
insert into ugotfilm_genre VALUES (14, '판타지');
insert into ugotfilm_genre VALUES (36, '역사');
insert into ugotfilm_genre VALUES (27, '공포');
insert into ugotfilm_genre VALUES (10402, '음악');
insert into ugotfilm_genre VALUES (9648, '미스터리');
insert into ugotfilm_genre VALUES (10749, '로맨스');
insert into ugotfilm_genre VALUES (878, 'SF');
insert into ugotfilm_genre VALUES (10752, '전쟁');
insert into ugotfilm_genre VALUES (37, '서부');

SELECT * FROM ugotfilm_genre;

-- 인물 정보 저장 테이블

--배우
DROP TABLE ugotfilm_cast;

CREATE TABLE ugotfilm_cast(
	personcode NUMBER, -- 사람 고유 번호
	name varchar2(100), -- 사람 이름
	profile_url varchar2(100) -- 사람 이미지
);

INSERT INTO ugotfilm_cast VALUES (172069, 'Chadwick Aaron Boseman', 'Acting', 'url');

-- 감독
drop table ugotfilm_director;

create table ugotfilm_director(
	personcode NUMBER, -- 사람 고유 번호
	name varchar2(100), -- 사람 이름
	profile_url varchar2(100) -- 사람 이미지 url
);

-- 인물 정보 샘플

insert into ugotfilm_director values (1056121, 'Ryan Coogler', 'Directing', 'url');

SELECT * FROM ugotfilm_cast;
SELECT * FROM ugotfilm_director;

-- 유저 선택 기록 (영화)
drop table ugotfilm_movie_choice;

create table ugotfilm_movie_choice(
	usercode number, -- 유저 번호
	moviecode number, -- 영화 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 기록 (감독)
drop table ugotfilm_director_choice;

create table ugotfilm_director_choice(
	usercode number, -- 유저 번호
	personcode number, -- 사람 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 기록 (배우)
drop table ugotfilm_cast_choice;

create table ugotfilm_cast_choice(
	usercode number, -- 유저 번호
	personcode number, -- 사람 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 기록 (장르)
drop table ugotfilm_genre_choice;

create table ugotfilm_genre_choice(
	usercode number, -- 유저 번호
	genrecode number, -- 장르 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 샘플
INSERT INTO ugotfilm_movie_choice VALUES (1, 505642, sysdate); -- 영화
INSERT INTO ugotfilm_director_choice VALUES (1, 1056121, sysdate); -- 감독
INSERT INTO ugotfilm_cast_choice VALUES (1, 172069, sysdate); -- 배우

INSERT INTO ugotfilm_genre_choice VALUES (1, 28, sysdate); -- 장르
INSERT INTO ugotfilm_genre_choice VALUES (1, 12, sysdate); -- 장르
INSERT INTO ugotfilm_genre_choice VALUES (1, 878, sysdate); -- 장르

commit;

SELECT * FROM ugotfilm_movie_choice;
SELECT * FROM ugotfilm_director_choice;
SELECT * FROM ugotfilm_cast_choice;
SELECT * FROM ugotfilm_genre_choice;

-- 다양한 기준의 정보 샘플
--1번 유저가 가장 선호하는 영화 장르(많이 클릭한 순)
select g.name, u.* from (select genrecode, count(genrecode) as count from ugotfilm_genre_choice where usercode=1 group by genrecode) u 
left join ugotfilm_genre g on g.genrecode=u.genrecode order by count desc;


-- 1번 유저가 클릭한 영화 리스트(많이 클릭한 순)
select m.* from (select moviecode, count(moviecode) as count from ugotfilm_movie_choice where usercode=1 group by moviecode) u 
left join ugotfilm_movie m on m.moviecode=u.moviecode order by count desc;

SELECT * FROM UGOTFILM_MOVIE_CHOICE ;


------------------------------------------------

-- 유저 성별에 따른 많이 클릭한 영화 리스트

SELECT m.* FROM (
	SELECT b.moviecode, count(b.moviecode) AS count
	FROM UGOTFILM_USER  a, UGOTFILM_MOVIE_CHOICE  b
	WHERE a.usercode = b.usercode
	AND a.gender = (SELECT gender FROM UGOTFILM_USER WHERE usercode= 1) -- 유저 코드 값에 따라 바뀐다.
	GROUP BY b.moviecode) g
LEFT JOIN UGOTFILM_MOVIE m ON m.moviecode = g.moviecode ORDER BY count desc;


------------------------------------------------------

-- 유저에 따른 많이 클릭한 장르별 리스트

SELECT b.genrecode, count(b.genrecode) AS count
FROM UGOTFILM_USER a, UGOTFILM_GENRE_CHOICE b
WHERE a.usercode = b.usercode
AND a.usercode = 1
GROUP BY GENRECODE;













