Настройка проекта:

1. перейти в папку /server
2. npm i -> установка необходимых зависимостей на стороне сервера
3. psql -U postgres -f init-db.sq -> подключение к базе данных 'store' из файла 'init-db.sql'
4. npm start [cd server]
-- в результате шага 4 будет ошибка, если не выполнен шаг 3 (в консоли появится сообщение: Database does not exist)
5. перейти в папку /client
6. npm i->  установка необходимых зависимостей на стороне клиента
7. npm start

 