Запуск psql для Windows, но перед этим добавить папку где лежит psql.exe в Path.

```shell
$ psql -U postgres
```

Создать базу данных

```psql
create database mediumclone;
create user mediumclone with encrypted password '123';
grant all privileges on database mediumclone to mediumclone;
```

Основные команды для psql:

- `\l` - список баз (list)
- `\du` - список ролей (пользователей) (display users)
- `\c <название базы>` - коннект к базе данных (connect)
- `\dt` - отобразить таблицы (display table)
- `\d <название таблицы>` - отобразить поля таблицы (display)

Добавить теги

```psql
INSERT INTO tags (name) VALUES ('dragons');
INSERT INTO tags (name) VALUES ('coffee');
SELECT * FROM tags;
```
