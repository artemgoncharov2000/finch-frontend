import { Model, ORM, fk, attr } from 'redux-orm'
import { GET_USER } from '../actions/actionTypes';



class User extends Model {

    getUserData(): void {
        
    }

    static reducer(action: any, User: any, session: any){
        let user;
        switch(action.type) {
            case GET_USER:
                break;
        }
    }
}




User.modelName = "User"

User.fields = {
    username: attr(),
    description: attr(),
    email: attr(),
    phone: attr(),
    profileAccess: attr(),
    profilePhotoUrl: attr(),
    subscribersCount: attr(),
    subscriptionCount: attr(),
    title: attr(),
    type: attr(),
}

export default User




