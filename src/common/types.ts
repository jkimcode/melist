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
    rank_within_section: string | null, 
    reaction: string | null, 
    section_id: string, 
    user_id: string,
    product_name: string,
    tags?: TagData[]
    product_link?: string | null
}
export type SectionData = {
    section_name: string, 
    section_id: string,
    products: ProductData[]
}
export type MelistData = SectionData[]
export type UserData = {
    userId: string,
    username: string,
    displayName: string
}

// only for search result
export type SearchResultCondensedProduct = {
    product_name: string
}
export type SearchResultProfile = {
    userId: string,
    username: string,
    displayName: string,
    products: SearchResultCondensedProduct[]
}

// only for followed
export type FollowedCondensedProduct = {
    product_name: string
}
export type FollowedProfile = {
    userId: string,
    username: string,
    displayName: string,
    products: FollowedCondensedProduct[]
}

// post
export type PostProduct = {
    user_id: string, 
    reaction: string, 
    include_link_if_present: boolean, 
    product_name: string, 
    section_id: string,
    rank_within_section: string,
    product_link: string
}
export type PostProductTag = {
    tag_id: string, 
    m_product_id: string, 
    user_id: string
}
export type PostProductUserSave = {
    user_id: string,
    m_product_id: string,
    src_user_id: string
}

// update
export type UpdateProduct = {
    reaction?: string, 
    include_link_if_present?: boolean, 
    section_id?: string,
    rank_within_section?: string,
    product_link?: string
}

// response
export type ResponseTag = {
    tag_id: string,
    user_id: string,
    tag_name: string
}
export type ResponseFetchProductUserSave = {
    user_id: string,
    src_user_id?: string,
    m_product_id: string
}

