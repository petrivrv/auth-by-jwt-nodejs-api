данное API предоставляет:
1) зарегистрировать пользователя, endpoint /api/reg  POST
{
    "name": "admin",
    "pswd" :"admin123",
    "role" :"admin"
}
в итоге создается запись в БД при этом пароль хешируется

2) залогинется endpoint /api/login   POST
{
    "name": "admin",
    "pswd" :"admin123"
    
}
в итоге получаем JWT токен

3) получить список юзеров, endpoint /api/users  GET
при этом нужно в заголовки запроса добавить токен из метода login в headers.authorization
