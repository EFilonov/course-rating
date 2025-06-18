'use client';
import { useSearchParams } from "next/navigation";

const SearchPage = (): React.JSX.Element => {

    // const searchParams = useSearchParams();
 
    // const search = searchParams.get('q');
    return (
        <div>
            <h1>Поиск</h1>
            <p>Здесь страница поиска.</p> 
            {/* {search && <p>Вы искали: <strong>{search}</strong></p>}
            {!search && <p>Введите запрос в строку поиска.</p>} */}
        </div>
    );
};

export default SearchPage;