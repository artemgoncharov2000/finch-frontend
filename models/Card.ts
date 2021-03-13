import { Model, attr } from 'redux-orm'

class Card extends Model {}

Card.modelName = "Card"

Card.fields = {
    accessType: attr(),
    guideId: attr(),
    id: attr(),
    location: attr(),
    tags: attr(),
    text: attr(),
    thumbnailUrl: attr(),
    title: attr()
}

export default Card