module.exports=function(app){
    app.use('/api',require('./auth'));
    app.use('/api',require('./contact'));
    app.use('/api',require('./email'));
}
