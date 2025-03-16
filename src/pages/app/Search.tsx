import Melist from "../../components/Melist"

function Search() {
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="font-bold text-3xl mt-16">Results</div>
            <div className="flex mt-4 gap-6">
                <Melist displayMode="condensed" />
                <Melist displayMode="condensed" />
            </div>
            <div className="flex mt-4 gap-6">
                <Melist displayMode="condensed" />
                <Melist displayMode="condensed" />
            </div>
            <div className="flex mt-4 gap-6">
                <Melist displayMode="condensed" />
                <Melist displayMode="condensed" />
            </div>
            
        </div>
    )
}

export default Search