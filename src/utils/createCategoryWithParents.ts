import { Category } from '../models/Category';

export async function createCategoryWithParents(id: string) {
    let categoryWithParents = [];
    let findParents = await Category.findOne({ _id: id });
    categoryWithParents.push(findParents._id);

    while (findParents.parent) {
        const newCategory = await Category.findOne({
            _id: findParents.parent._id,
        });
        findParents = newCategory;
        categoryWithParents.push(newCategory._id);

        if (!findParents.parent) {
            console.log(categoryWithParents);
            break;
        }
    }
    return categoryWithParents;
}
