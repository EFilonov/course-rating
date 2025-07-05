import { create } from "zustand";

import { firstLevelMenu } from "../components/Menu/constants/firstLevelMenu";
import { useHttp } from "../hooks/useHttp";
import { FlatMenuState, MenuState } from "../interfaces/menuState.interface";
import { ProductModel } from "../interfaces/product.interface"; // если ещё не импортирован

const { fetchMenu, fetchProducts } = useHttp();

const FLAT_MENU_KEY = 'flatMenuCache';
const PRODUCTS_CACHE_KEY = 'productsCache';



const getFlatMenu = async (): Promise<FlatMenuState[]> => {
    // 1. Пробуем взять из sessionStorage
    const cached = sessionStorage.getItem(FLAT_MENU_KEY) || null;
    if (cached) {
        try {
            const data = JSON.parse(cached) as FlatMenuState[];
            if (Array.isArray(data) && data.length > 0) {
                console.log('Using flatMenu from sessionStorage');
                return data;
            }
        } catch (e) {
            // ignore parse error
        }
    }

    // 2. Если нет — делаем запрос
    const flat: FlatMenuState[] = [];
    return await Promise.all(
        firstLevelMenu.map((firstCategory) => fetchMenu(firstCategory.id))
    )
    .then((allMenus) => {
        allMenus.forEach((menuArr, index) => {
            const first = firstLevelMenu[index];
            menuArr.forEach((second) => {
                second.pages.forEach((third) => {
                    flat.push({
                        firstLvl: first.route,
                        firstLvlName: first.name,
                        secondLvlName: second._id.secondCategory,
                        thirdLvl: third.alias,
                        thirdLvlName: third.title,
                        href: `/${first.route}/${third.alias}`,
                        thirdLvlId: third._id,
                        productsCategory: third.category,
                    });
                });
            });
        });
        // 3. Кладём в sessionStorage
        sessionStorage.setItem(FLAT_MENU_KEY, JSON.stringify(flat));
        return flat;
    })
    .catch((error) => {
        console.error('Error in getFlatMenu:', error);
        return [];
    });
};

const getAllProducts = async (flatMenu: FlatMenuState[]) => {
    // 1. Пробуем взять из sessionStorage
    const cached = sessionStorage.getItem(PRODUCTS_CACHE_KEY) || null;
    if (cached) {
        try {
            const data = JSON.parse(cached) as Array<FlatMenuState & { products: ProductModel[] }>;

            if (Array.isArray(data) && data.length > 0) {
                console.log('Using productsCache from sessionStorage');
                return data;
            }
        } catch (e) {
            // ignore parse error
        }
    }

    // 2. Если нет — делаем запросы
    return await Promise.all(
        flatMenu.map(async (item) => {
            try {
                const products = await fetchProducts(item.productsCategory);
                return { ...item, products };
            } catch (error) {
                console.error(`Error fetching products for ${item.thirdLvlName}:`, error);
                return { ...item, products: [] };
            }
        })
    ).then((productsWithMenu) => {
        // 3. Кладём в sessionStorage
        sessionStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(productsWithMenu));
        return productsWithMenu;
    }).catch((error) => {
        console.error('Error fetching all products:', error);
        return [];
    });
};

export const menuState = create<MenuState>((set) => ({
    loading: true,
    error: null,
    flatMenu: [],
    allProducts: [],
    fetchMenus: {
        
        setMenus: (async () => {
            set({ loading: true, error: null });
            try {
                const flatMenu = await getFlatMenu();
                set({ flatMenu });
                // Асинхронно получаем продукты и кладём их в стор
                const productsWithMenu = await getAllProducts(flatMenu);
                const allProducts = productsWithMenu.flatMap(item => item.products);
                set({ allProducts, loading: false });
                // return allProducts;
            } catch (error) {
                console.error('Error fetching menus:', error);
                set({ error: error instanceof Error ? error.message : 'Ошибка загрузки', loading: false });
                // return [];
            } finally {
                set({ loading: false });
            }
        })()
    }
}));

