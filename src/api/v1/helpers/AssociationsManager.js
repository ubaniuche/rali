export default class AssociationManager {
    static droneAssociation () {
        return {
            attributes: { exclude: ['model_id']},
            include: [
                {association: "model"}
            ]
        }
    }

    static droneLoadAssociation () {
        return {
            attributes: { exclude: ['drone_id']},
            include: [
                {association: 'drone'},
                {
                    attributes: {
                        exclude: ['medication_id', 'weight']
                    },
                    association: 'loaded_items',
                    include: [
                        { association: 'medication' }
                    ]
                }
            ]
        }
    }

    static loadItemsAssociation () {
        return {
            attributes: { exclude: ['medication_id', 'weight']},
            include: [
                { association: 'medication' }
            ]
        }
    }
}