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

export type TagSelectable = {
    id: string,
    tag_name: string,
    selected: boolean
}

export type TagData = {
    tag_id: string,
    tag_name: string,
    product_id: string
}
export type ProductData = {
    id: string, 
    include_link_if_present: boolean, 
    rank_within_section: string, 
    reaction: string, 
    section_id: string, 
    user_id: string,
    product_name: string,
    tags?: TagData[]
}
export type SectionData = {
    section_name: string, 
    section_id: string,
    products: ProductData[]
}
export type MelistData = SectionData[]
