import {todoService} from "../../services/todoService";

export const homePageLoader =async () => {
    const categories = await todoService.getAllCategories();

    return {
        categories
    };
}
