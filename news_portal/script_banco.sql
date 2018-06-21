CREATE DATABASE portal_noticias;
USE portal_noticias;

CREATE TABLE noticias(
	id_noticia INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    noticia text,
    data_criacao timestamp default current_timestamp
);

INSERT INTO noticias(titulo,noticia) VALUES ('titulo da noticia', 'descrição da noticia');

ALTER TABLE `portal_noticias`.`noticias` 
ADD COLUMN `resumo` VARCHAR(100) NULL AFTER `data_criacao`,
ADD COLUMN `autor` VARCHAR(30) NULL AFTER `resumo`,
ADD COLUMN `data_noticia` DATE NULL AFTER `autor`;