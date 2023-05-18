import {todoService} from "../../services/todoService";
import {LoaderFunctionArgs, redirect} from "react-router-dom";

export const categoryPageLoader = async ({ params }: LoaderFunctionArgs) => {
    const categories = await todoService.getAllCategories();
    const categoryId = params.categoryId;
    let selectedMenuIndex = categories.findIndex((category) => category.id === categoryId);
    if (selectedMenuIndex === -1) {
        return redirect(`/categories/${categories[0].id}`);
    }
    let categoryInfo = null;
    if (categoryId) {
        categoryInfo = await todoService.getCategoryInfo(categoryId);
    }

    return {
        categories,
        categoryInfo,
        selectedMenuIndex
    };
}
