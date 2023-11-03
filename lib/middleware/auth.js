function authenticate(req , res , next){
    if(!req.session.email){
        let err = new Error();
        err.status = 401;
        err.message = "Authentication required!";
        next(err);
    }
    else{
        next();
    }
}