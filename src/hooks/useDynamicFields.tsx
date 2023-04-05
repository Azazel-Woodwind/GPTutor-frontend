import React from "react";
import { v4 as uuidv4 } from "uuid";

const useDynamicFields = ({ formElements, min, max, form }) => {
    const type = React.useRef(uuidv4());
    const [elements, setElements] = React.useState<JSX.Element[]>([]);

    const modifyElement = (oldElement, index) => {
        const additionalProps = form.register(
            generateDataString(index, oldElement),
            {
                ...(oldElement.props.options ? oldElement.props.options : {}),
            }
        );

        const niveauElement = React.cloneElement(oldElement, {
            ...oldElement.props,
            ...additionalProps,
        });

        return niveauElement;
    };

    React.useEffect(() => {
        var newElements = [];
        for (var x = 0; x < min; x++) {
            newElements.push(formElements.map(elem => modifyElement(elem, x)));
        }

        setElements(newElements);
    }, []);

    const addField = () => {
        if (elements.length >= max) return;
        setElements([
            ...elements,
            formElements.map((elem, index) =>
                modifyElement(elem, elements.length)
            ),
        ]);
    };

    const deleteField = index => {
        setElements(prev => {
            const temp = [...prev];
            temp.splice(index, 1);
            formElements.forEach(element =>
                form.unregister(generateDataString(index, element))
            );
            return temp;
        });
    };

    const generateDataString = (number, element) =>
        `${type.current}_${number}_${element.props.name}`;

    const unwrap = data => {
        // console.log(data);

        const dynamicData = [];
        elements.forEach((_, elementIndex) => {
            const obj = {};
            formElements.forEach((element, i) => {
                obj[element.props.name] =
                    data[generateDataString(elementIndex, element)];
            });

            dynamicData.push(obj);
        });

        return dynamicData;
    };

    return {
        elements,
        unwrap,
        deleteField,
        addField,
        isMax: elements.length >= max,
        isMin: elements.length <= min,
    };
};

export default useDynamicFields;
