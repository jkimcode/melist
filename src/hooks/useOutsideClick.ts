import { useEffect, useRef, useState } from "react";

export default function useOutsideClick(isActiveInitial : boolean) {
    const [isActive, setIsActive] = useState(isActiveInitial);
    const ref = useRef(null);

    const onClickHandler = (e : Event) => {
        if (!ref.current) return;
        const refCurrent = ref.current as HTMLInputElement;
        const eTarget = e.target as HTMLElement;
        if (ref.current && !refCurrent.contains(eTarget)) {
            setIsActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", onClickHandler)
        return () => document.removeEventListener("clikc", onClickHandler);
    })

    return { ref, isActive, setIsActive}
}
