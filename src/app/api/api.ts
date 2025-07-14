export const API = {
    topPage: {
        find: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/'
    },
    product: {
        find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    },
    review: {
        createDemo: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create-demo',
    }
    
};

export const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@efilonovcluster.qj9n1iu.mongodb.net/course_rating?retryWrites=true&w=majority&appName=EFilonovCluster`;


