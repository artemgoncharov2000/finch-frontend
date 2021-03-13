import {ORM} from 'redux-orm';
import Guide from '../models/Guide';
import User from '../models/User';

const orm = new ORM({
    stateSelector: state => state.orm
});
orm.register(User);
orm.register(Guide);
orm.register(Guide);

export default orm;