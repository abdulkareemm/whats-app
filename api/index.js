const app = require("./apps/app");
const logger = require("./configs/logger");

let server = app.listen(process.env.PORT, () => {
  logger.info(`${process.env.PORT}`);
});
//  handle server errors
const exitHandler = ()=>{
    if(server){
        logger.info("Server Closed")
        process.exit(1);

    }else{
        process.exit(1)
    }
}
const unexpectedErrorHandler  = (error)=>{
    logger.error(error)
    exitHandler()
}

process.on("uncaughtException",unexpectedErrorHandler)
process.on("unhandledRejection",unexpectedErrorHandler)