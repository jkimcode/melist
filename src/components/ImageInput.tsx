import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"

interface ImageInputProps {
    image: File | undefined,
    setImage:  Dispatch<SetStateAction<File | undefined>>
}
function ImageInput({ image, setImage } : ImageInputProps) {
    const [imagePreview, setImagePreview] = useState<string>()

    useEffect(() => {
        if (!image) return 

        const url = URL.createObjectURL(image)
        setImagePreview(url)

        console.log(url)

        return () => URL.revokeObjectURL(url)
    },[image])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length == 0) {
            return 
        }

        const file = e.target.files[0]
        setImage(file)
    }
    return (
        <div>
            <input type="file" accept=".png, .jpg, .jpeg" onChange={onChangeHandler} />
            {imagePreview && (
                <img style={{width: 200, height: 200}} className="object-cover rounded-lg" src={imagePreview} />
            )}
        </div>
    )
}

export default ImageInput