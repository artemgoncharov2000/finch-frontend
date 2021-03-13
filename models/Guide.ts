import { Model, attr } from 'redux-orm'

class Guide extends Model {}

Guide.modelName = "Guide"

Guide.fields = {
    authorUsername: attr(),
    created: attr(),
    description: attr(),
    id: attr(),
    location: attr(),
    thumbnailUrl: attr(),
    title: attr(),
    travelDate: attr(),
    type: attr()
}

export default Guide