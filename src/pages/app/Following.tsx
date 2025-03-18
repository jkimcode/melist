import Melist from "../../components/Melist"

function Following() {
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-medium text-3xl mt-16 justify-self-start">Following</div>
                    <div className="mt-4 flex gap-4">
                        {/* should organize fetch data s.t. list follower decreases left->right, top->down */}
                        <div className="flex flex-col gap-4">
                            <Melist displayMode="minimized" />
                            <Melist displayMode="minimized" />
                            <Melist displayMode="minimized" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Melist displayMode="minimized" />
                            <Melist displayMode="minimized" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Following