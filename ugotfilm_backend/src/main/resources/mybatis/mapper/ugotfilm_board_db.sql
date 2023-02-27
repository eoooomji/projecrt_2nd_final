
-- 삭제
drop table ugotfilm_notice_board;
drop sequence ugotfilm_notice_board_seq;
drop table ugotfilm_notice_comment;
drop sequence ugotfilm_notice_comment_seq;
--------------------------------------------------
-- 공지 게시판 --------------------------------------
-- 공지게시판 테이블
create table ugotfilm_notice_board(
   	num number,                     --글번호
   	writer number,            --작성자(유저코드)
	subject varchar2(1000),           --글제목
	reg_date date,                 --작성일
	readcount number default 0,     --조회수
	ref number,                     -- 답글 기준 본글
	re_step number,                 -- 
	re_level number,                -- 
	content varchar2(4000),                --글내용
	ip varchar2(20),                --ip
    upload varchar2(300)               --업로드 파일
);
-- 공지게시판 시퀀스
create sequence ugotfilm_notice_board_seq start with 1 increment by 1 nocache nocycle;

-- 공지게시판 샘플
insert into ugotfilm_notice_board 
values(ugotfilm_notice_board_seq.nextval, 1, '제목1',sysdate,0,ugotfilm_notice_board_seq.nextval,
0,0,'내용 테스트.......','127.0.0.1','sample.txt');

-- 공지게시판 댓글 테이블
create table ugotfilm_notice_comment(            
        pnum number,                       
        num number,                        
        writer number,                       
        reg_date date,                                         
        subject varchar2(4000),               
        ip varchar2(20)                              
);

-- 공지게시판 댓글 시퀀스
create sequence ugotfilm_notice_comment_seq start with 1 increment by 1 nocache nocycle;

-- 공지게시판 댓글 샘플
INSERT INTO ugotfilm_notice_comment(pnum, num, writer, reg_date, subject, ip)
values(1, ugotfilm_notice_comment_seq.nextval, 1,sysdate,'댓글 테스트.......','127.0.0.1');

commit;

---확인
select * from ugotfilm_notice_board;
select * from ugotfilm_notice_comment;