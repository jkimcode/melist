import HomePicturePost from "../../components/HomePicturePost"
import HomePost from "../../components/HomePost"

function Home() {
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="font-medium text-3xl mt-16">Home</div>
            <div className="flex gap-6 mt-6">
                <div className="flex flex-col gap-6">
                    <HomePost postType="followUpdate" />
                    <HomePost postType="recommendedProducts" />
                </div>
                <div>
                    <HomePicturePost />
                </div>
            </div>
        </div>
    )
}

export default Home