
/*
     - QUERY PARAMS => meusite.com/users?nome=gabriel&age=28 //FILTROS
     - ROUTE PARAMS =>   /users/2       //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
*/

/* const express = require ('express')
// const port  = 4000

// const app = express()


// app.get('/users', (request, reponse) => {

//     //DESTRUCTURING ASSIGNMENT ECONOMIZA MAIS CÓDIGO!
//     const {name, age } = request.query
//     return reponse.json({name, age})

    
    


       //OUTRO JEITO DE FAZER PORÉM MAIS DEMORADO E MENOS ORGANIZADO
      // const name = request.query.name
// const age = request.query.age
// console.log(name, age);
    

 })

 app.listen(port, () =>{
     console.log(`🚀 Server started on port  ${port}`);
    
 })

/*













 /*
     - QUERY PARAMS => meusite.com/users?nome=gabriel&age=28 //FILTROS
     - ROUTE PARAMS =>   /users/2       //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
     - REQUEST BODY => {"name": "Gabriel", "age":}
 */

/* const express = require ('express')


// const port  = 4000
// const app = express()
// app.use(express.json())



// app.get('/users', (request, reponse) => {

    
//     const {name, age} = request.body
//     console.log(request.body)
    

//     return reponse.json({name, age})
//     // return reponse.send('Hello express')

    
    


  //OUTRO JEITO DE FAZER PORÉM MAIS DEMORADO E MENOS ORGANIZADO
   //const name = request.query.name
   //const age = request.query.age 
   //console.log(name, age);

// })

 app.listen(port, () =>{
     console.log(`🚀 Server started on port  ${port}`);
    
 })

/*









/*
    - QUERY PARAMS => meusite.com/users?nome=gabriel&age=28 //FILTROS
    - ROUTE PARAMS =>   /users/2       //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - REQUEST BODY => {"name": "Gabriel", "age":}


    -GET                   => Buscar informação no back-end
    -POST                  => Criar informação no back-end
    -PUT / PATCH           => Alterar / Atualizar informação no back-end
    -DELETE                => DELETAR informação no back-end
*/

/*PRIMEIRO PROJETO  USANDO GET E POST

const express = require ('express')
const uuid =  require('uuid')


const port  = 4000
const app = express()
app.use(express.json()) 


const users = []

app.get('/users', (request, reponse) => {
    return reponse.json(users)

})

app.post('/users', (request, reponse) => {
    const {name, age} = request.body

    
    const user = { id:uuid.v4(), name, age}

    users.push(user)

    return reponse.status(201).json(user)

})


app.listen(port, () =>{
    console.log(`🚀 Server started on port  ${port}`);
    
})
*/





/*
        ATUALIZAR  PUT
    - QUERY PARAMS => meusite.com/users?nome=gabriel&age=28 //FILTROS
    - ROUTE PARAMS =>   /users/2       //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - REQUEST BODY => {"name": "Gabriel", "age":}


    -GET                   => Buscar informação no back-end
    -POST                  => Criar informação no back-end
    -PUT / PATCH           => Alterar / Atualizar informação no back-end
    -DELETE                => DELETAR informação no back-end

    - MIDDLEWARE => INTERCEPTADOR => TEM O PODER PARA OU ALTERAR DADOS DA REQUISIÇÃO 
*/
const express = require ('express')
const uuid =  require('uuid')
const cors = require ('cors')


const port  = 3001
const app = express()
app.use(express.json())
app.use(cors())



const users = []

const checkUserId = (request, reponse,next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id ===id)

    if(index < 0){
        return reponse.status(404).json({error: "not exist"})
    }
    request.userIndex = index

    request.userId = id 

    next()
}
app.get('/users', (request, reponse) => {
    return reponse.json(users)
    
})

/*

TRATAMENTOS DE ERROS(TRY CATCH)

*/

app.post('/users', (request, reponse) => {

    try{
    const {name, age, city} = request.body

    //ACEITAR SO PESSOAS MAIORES DE 18 ANOS
    // if(age < 18) throw new Error("Only allowed users over 18 years old")

    
    const user = { id:uuid.v4(), name, age, city}

    users.push(user)

    return reponse.status(201).json(user)   
    
} catch(err){
    return reponse.status(400).json({error:err.message})
    /*FINALLY É OPCIONAL EXEMPLO ABAIXO*/
}finally{
    
}

})

app.put('/users/:id',checkUserId, (request, reponse) => {
    const {name, age, city } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = {id, name, age, city} // atualizar usuario

    users[index] = updatedUser
    return reponse.json(updatedUser)







    // const {id} = request.params
    // const { name, age} = request.body

    // const updatedUser = {id, name, age}

    // const index = users.findIndex(user => user.id ===id)

    // if(index < 0){
    //     return reponse.status(404).json({message: "user not found"})
    // }

    // users[index] = updatedUser

    // return reponse.json(updatedUser)

})

//DELETE
app.delete('/users/:id', checkUserId, (request, reponse) => {

    const index = request.userIndex


    users.splice(index,1)

    return reponse.status(204).json()

})

app.listen(port, () =>{
    console.log(`🚀 Server started on port  ${port}`);
    
})
