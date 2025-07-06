
export interface ProductModel {
  _id: string
  categories: string[]
  tags: string[]
  title: string
  link: string
  image: string
  initialRating: number
  characteristics: Characteristic[]
  price: number
  oldPrice: number
  credit: number
  description: string
  advantages: string
  disAdvantages?: string
  createdAt: string
  updatedAt: string
  __v: number
  html: string
  blog: Blog
  additionalMeta?: AdditionalMeta
  companyId: string
  clicks: number
  reviews: Review[]
  reviewCount: number
  reviewAvg: number
  
}

export interface Characteristic {
  name: string
  value: string
}

export interface Blog {
  text: string
  bigImage?: string
  _id: string
}

export interface AdditionalMeta {
  metaTitle: string
  metaDescription: string
  _id: string
}

export interface Review {
  _id: string
  name: string
  title: string
  description: string
  rating: number
  productId: string
  createdAt: string
  updatedAt: string
  __v: number
}