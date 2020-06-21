use su;

-- ��˳�����������ϵ�ı�������
delete Elective;
delete Student;
delete Course;

--alter table Elective add test_column varchar(32);
--alter table Elective alter column test_column int
--alter table Elective drop test_column;


-- ����ѧ������
insert into Student(id,name,password,address) values (1,'С��','123456','Chang Sha');
insert into Student(id,name,password,address) values (2,'С��','123456','Chang Sha');
insert into Student(id,name,password,address) values (3,'С��','123456','Chang Sha');
insert into Student(id,name,password,address) values (4,'С��','123456','Chang Sha');
-- ����γ�����
insert into Course(id,category,tid) values (1,'�ߵ���ѧ',1);
insert into Course(id,category,tid) values (2,'��ѧӢ��',1);
insert into Course(id,category,tid) values (3,'Java ����',1);
-- N:N ��ϵ������ѧ���γ�
-- С��ѧ���ţ�С��ѧ������Ӣ�С��ѧJava
insert into Elective(sid,cid,mark) values (1,1,82);
insert into Elective(sid,cid,mark) values (1,2,72);
insert into Elective(sid,cid,mark) values (1,3,80);
insert into Elective(sid,cid,mark) values (2,1,99);
insert into Elective(sid,cid,mark) values (2,2,60);
insert into Elective(sid,cid,mark) values (3,3,72);
insert into Elective(sid,cid,mark) values (4,1,89);
insert into Elective(sid,cid,mark) values (4,2,61);
-- ������������
-- insert into Elective(sid,cid,mark) values (999,999,100);

-- ���¾�������С���ĸߵ���ѧ�ɼ���Ϊ100��
update Elective set mark = 100 where sid = 1 and cid = 1;

-- ɾ����������С���� Java �γ�ɾ����
-- ���Ӳ�ѯ�����ƵĻ��� sid in(...)
delete from Elective where sid = (
	select Student.id from Student where name = 'С��'
) and cid = (
	select Course.id from Course where category = 'Java ����'
);

-- �������ѧ�����п�Ŀ�ĳɼ����Ұ��ɼ�����
select Student.name,Course.category,Elective.mark from Student 
	left join Elective on Student.id = Elective.sid
	left join Course on Elective.cid = Course.id
	where Student.name like 'С%'
	order by mark desc;

-- ���ÿ��ѡ������
select Course.category,count(Elective.sid) from Course
left join Elective on Elective.cid  = Course.id 
group by Course.category



