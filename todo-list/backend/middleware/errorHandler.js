const {constatants} = require('../constant');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constatants.VALIDATION_ERROR:
            res.json({ "title": "Validation Falied" , message: err.message, stackTrace: err.stack })
            break;

        case constatants.NOT_FOUND:
            res.json({ "title": "Not Found" , message: err.message, stackTrace: err.stack })
            break;

        case constatants.UNAUTHORIZED:
            res.json({ "title": "Unauthorized" , message: err.message, stackTrace: err.stack })
            break;
        
        case constatants.FORBIDDEN:
            res.json({ "title": "Forbidden" , message: err.message, stackTrace: err.stack })
            break;
        
        case constatants.SERVER_ERROR:
            res.json({ "title": "ServerErorr" , message: err.message, stackTrace: err.stack })
            break;


        default:
            console.log("No Error, All is well !")
            break;
    }
    
}


module.exports = errorHandler;