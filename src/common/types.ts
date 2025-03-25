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

export type TagData = {
    id: string,
    tag_name: string,
    selected: boolean
}
export type ProductData = {
    id: string, 
    include_link_if_present: boolean, 
    rank_within_section: string, 
    reaction: string, 
    section_id: string, 
    user_id: string,
    product_name: string
}
export type SectionData = {
    section_name: string, 
    products: ProductData[]
}
export type MelistData = SectionData[]
