// 예시: 유저 정보를 가져오는 API
const routes = app
    .get('/hello', (c) => c.json({ message: 'Hello!' }))
    .post('/user', (c) => {
        return c.json({ id: 1, name: '멋사' })
    })