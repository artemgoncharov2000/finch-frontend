
import {createSelector} from "redux-orm";
import orm from '../orm/orm';


export const user = createSelector(
    orm,
    (session, username) => {
        return session.User.withId(username).toModel();
    }
);

