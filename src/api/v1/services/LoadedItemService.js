import AssociationManager from '../helpers/AssociationsManager';
import { BadRequestError, NoContentError, NotFoundError } from '../helpers/exceptions';
import { LoadedItemRepo } from '../repositories'

export default class LoadedItemService {

    /**
     * @name loadItem
     * @static
     * @async
     * @param {object} data - {drone_id, medication_id, weight, quantity}
     * @returns {Object} {id, drone_id, medication_id, weight, quantity}
     */
    static async loadItem(data = {}, transaction) {
        return await LoadedItemRepo.create(data, transaction)
    }

    /**
     * @name findItem
     * @static
     * @async
     * @param {object} conditions - {id}
     * @param {object} options - {}
     * @returns {object} {id, drone_id, medication_id, weight, quantity}
     */
    static async findItem(conditions = {}, options = AssociationManager.loadItemsAssociation(), validate = true) {
        const item = await LoadedItemRepo.findOne(conditions, options)

        if (validate && !item) throw new NotFoundError("Item not found")

        return item
    }

    /**
     * @name findAllItems
     * @static
     * @async
     * @param {object} conditions - {id}
     * @param {object} options - {}
     * @param {boolean} validate
     * @returns {Array} [{id, drone_id, medication_id, weight, quantity}]
     */
    static async findAllItems(conditions = {}, options = AssociationManager.loadItemsAssociation(), validate = true) {
        const items = await LoadedItemRepo.findAll(conditions, options)

        if (validate && items.count == 0) throw new NoContentError("Items not found")

        return items
    }

    /**
     * @name findAllItems
     * @static
     * @async
     * @param {object} conditions - {id}
     * @returns {boolean}
     */
    static async offloadItem(condition, transaction) {
        const item = await this.getItem(condition)

        await item.destroy({transaction})

        return true
    }

    /**
     * @name updateItem
     * @static
     * @async
     * @param {object} conditions - {id}
     * @param {object} data - {}
     * @returns {object} {id, drone_id, medication_id, weight, quantity}
     */
    static async updateItem(condition, data = {}, transaction) {
        const item = await LoadedItemRepo.findOne(condition, {})
        
        await item.update(data, {transaction})
        
        return item
    }

    /**
     * @name offloadAllItems
     * @static
     * @async
     * @param {object} conditions - {id}
     * @returns {boolean}
     */
    static async offloadAllItems(condition, transaction) {
        const loadedItems = await LoadedItemRepo.deleteAll(condition, {}, transaction)

        if (loadedItems < 1) throw new BadRequestError("No items found")

        return true
    }
}