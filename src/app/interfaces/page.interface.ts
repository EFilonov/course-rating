export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export interface TopPageAdvantage {
	_id: string;
	title: string;
	description: string;
}

export interface HhData {
	_id: string;
	count: number;
	juniorSalary: string;
	middleSalary: string;
	seniorSalary: string;
	updatedAt: Date;
}

export interface TopPageModel {
	tags: string[];
	_id: string;
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	seoText?: string;
	tagsTitle: string;
	metaTitle: string;
	metaDescription: string;
	description: string;
	firstCategory: TopLevelCategory;
	advantages?: TopPageAdvantage[];
	createdAt: Date;
	updatedAt: Date;
	hh?: HhData;
	price: string;
}




// export interface TopPageModel {
//   _id: string
//   categories: string[]
//   category: string
//   tags: string[]
//   title: string
//   link: string
//   image: string
//   initialRating: number
//   characteristics: Characteristic[]
//   price: number
//   oldPrice: number
//   credit: number
//   description: string
//   advantages: string
//   disAdvantages?: string
//   createdAt: string
//   updatedAt: string
//   __v: number
//   html: string
//   blog: Blog
//   additionalMeta?: AdditionalMeta
//   companyId: string
//   clicks: number
//   reviews: Review[]
//   reviewCount: number
//   reviewAvg: number
// }

// export interface Characteristic {
//   name: string
//   value: string
// }

// export interface Blog {
//   text: string
//   bigImage?: string
//   _id: string
// }

// export interface AdditionalMeta {
//   metaTitle: string
//   metaDescription: string
//   _id: string
// }

// export interface Review {
//   _id: string
//   name: string
//   title: string
//   description: string
//   rating: number
//   productId: string
//   createdAt: string
//   updatedAt: string
//   __v: number
// }
