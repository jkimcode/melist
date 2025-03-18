
function Product({ productTitle } : { productTitle: string }) {
    return (
        <div className="flex">
            <div className="bg-white size-14 rounded-l-md">{productTitle}</div>
            <div className="bg-gray-200 w-full rounded-r-md"></div>
        </div>
    )
}

export default Product