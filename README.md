# Backend Personal

#### Boilerplate repository for Lectrum Backend Personal.

#### Перед запуском проекта:

1. Создать в корне проекта (на одном уровне с package.json) файл с именем `.env`
2. Добавить в файл следующий код:

```
# Debug
DEBUG='server:*,router:*,storage,db'

# Server
PORT=3000

# Cookie
PASSWORD='aE]_"a%YWjVn\DFp<4T/'

# DB
DB_NAME=''
DB_URL='lab.lectrum.io'
DB_PORT=37018
DB_USER=''
DB_PASSWORD=''
```

**Обратите внимание!**

1. PASSWORD → пароль используемый для шифрования cookie
2. DB_NAME → имя базы данных выбираем следующее → первая буква имени и фамилия латиницей, в нижнем регистре
3. DB_URL → DNS имя или IP для подключения к базе данных
4. DB_PORT → порт для подключения к базе данных
5. DB_USER → имя пользователя для подключения к базе данных **(выдаётся преподавателем)**
6. DB_PASSWORD → пароль для подключения к базе данных **(выдаётся преподавателем)**
