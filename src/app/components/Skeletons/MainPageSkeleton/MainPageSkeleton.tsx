
import 'react-loading-skeleton/dist/skeleton.css';
import { JSX } from 'react';
import Card from '../../Card/Card';
import ProductHeaderSkeleton from '../ProductHeaderSkeleton/ProductHeaderSkeleton';

const MainPageSkeleton = (): JSX.Element => {
    return (
        <>
            <Card>
                <ProductHeaderSkeleton/>
            </Card>
             <Card>
                <ProductHeaderSkeleton/>
            </Card>
            <Card>
                <ProductHeaderSkeleton/>
            </Card>
            <Card>
                <ProductHeaderSkeleton/>
            </Card>
            <Card>
                <ProductHeaderSkeleton/>
            </Card>
        </>
    );
};

export default MainPageSkeleton;