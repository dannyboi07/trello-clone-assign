import { useState, useEffect, useRef } from "react";

function useAnimation(isOpenProp, animTime) {
    // Dependant component will animate itself depending on this
    const [isOpen, setIsOpen] = useState(isOpenProp)

    // Dependant will return or not return it's elements depending on this
    const [internalIsOpen, setInternalIsOpen] = useState(false); 
    
    //
    const showTimeoutRef = useRef(null);
    const hideTimeoutRef = useRef(null);
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        isFirstRenderRef.current = false
    }, [])

    useEffect(() => {

        if (isOpenProp) {
            setInternalIsOpen(true);
            if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

            showTimeoutRef.current = setTimeout(() => {
                setIsOpen(true);
            }, 15);

        } else if (isOpenProp === false && !isFirstRenderRef.current) {
            setIsOpen(false);


            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

            hideTimeoutRef.current = setTimeout(() => {
                setInternalIsOpen(false);
            }, animTime * 10); 
            // animTime will mostly be 25, 25 * 100 = 250ms animation times
            // The component which depends on this hook will get off the dom 
            // tree after completing it's animation which lasts for ${animTime}
        };
    }, [isOpenProp]);

    return [isOpen, internalIsOpen];
}

export default useAnimation