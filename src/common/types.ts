export interface SectionDetails {
    title: string,
    displayTitle: boolean,
    type: string,
    products: ProductDetails[]
}
export interface ProductDetails {
    productTitle: string;
    productDesc?: string;
}
export interface MelistStyles {
    bgColor: string;
}
