const cors = require('cors');
const { response } = require('express');


const express = require('express');

const uuid = require('uuid')

//const port = process.env.PORT || 3001;





const app = express();
app.use(express.json())
// Permitindo o Front-End acessar informaçoes aqui com o CORS
app.use(cors())
const port = 3000;



// Middleware
const middleware = (request,response,next) => {
    const {id} = request.params
    

    const index = requests.findIndex(element => element.id === id)

    if (index < 0) {
        return response.status(404).json("Número de pedido incorreto!")
    }

    request.userIndex = index
    request.userId = id

    next()
}

// ROUTE

const requests = []

app.get('/', (request, response) => {
    return response.json("hello world")
})

// Rota que lista todos os pedidos
app.get('/hamburguer', (request, response) => {

    return response.json(requests)
})

// Rota que busca um pedido especifico
app.get('/hamburguer/:id', middleware, (request, response) => {

    const index = request.userIndex

    const orderEspecific = requests[index]

    if(app === app.get) {
        console.log("tipo get")
    }

    return response.json(orderEspecific)
})

// Rota, realizar pedidos
app.post('/hamburguer', (request, response) => {

    const id = uuid.v4()

    const { order, clientName, price, status } = request.body

    const theOrder = { id, order, clientName, price, status }

    requests.push(theOrder)

    return response.status(201).json(theOrder)
})

// Rota, editar pedido
app.put('/hamburguer/:id',middleware, (request, response) => {
    const id = request.userId

    const index = request.userIndex

    const { order, clientName, price, status } = request.body

    const orderUpdate = { id, order, clientName, price, status }

    requests[index] = orderUpdate

    return response.status(200).json(orderUpdate)
})

// Rota, de pedido pronto 
app.patch('/hamburguer/:id', middleware,(request,response) => {

    const index = request.userIndex
    
    const orderUpdateStatus = requests[index]

    orderUpdateStatus.status = "Pronto"
    
    return response.status(200).json(orderUpdateStatus)

})

// Rota, deletar pedidos
app.delete('/hamburguer/:id', middleware,(request,response) => {
    const index = request.userIndex

    requests.splice(index,1)

    return response.status(200).json("Pedido removido")
})

// PORT

app.listen(port, () => {
    console.log("👌Nice")
})


/* 
    - Query params => meusite.com/users?nome=rodolfo&age=28 // filtros
    - Route params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => {"name":"Daniel","age":}

    - GET => Buscar informaçoes no back-end
    - POST => Criar informaçoes no back-end
    - PUT / PATCH => Alterar/Atualizar informaçao no back-end
    - DELETE => Deletar informaçao no back-end

    -Middleware => Tem o poder de parar ou alterar dados da requisição
*/
