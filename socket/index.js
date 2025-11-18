module.exports = (io) =>{
    io.on('connection',(client)=>{
        console.log("client is connected")
        client.on('disconnected',()=>{
            console.log("client is disconnected")
        })
    })
}