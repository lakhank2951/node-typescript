import User from '../models/user';

export class UserController {
    static login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        console.log(req.body)
        const user = new User({
            email: email,
            password: password
        })

        user.save().then(user => {
            res.status(200).send(user)
        }).catch(e => {
            const error = new Error(e)
            next(error)
        })


    }
}