import React from "react";
import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const useDynamicFields = ({
    formElements,
    min,
    max,
    form,
    addInitial = true,
}) => {
    const type = React.useRef(uuidv4());
    const [elementData, setElementData] = React.useState<
        {
            elements: JSX.Element[];
            id: string;
            default: boolean;
        }[]
    >([]);

    const modifyElement = (
        oldElement,
        index,
        defaultValue,
        controlled = true
    ) => {
        const id = generateDataString(index, oldElement);

        // console.log(controlled);

        if (controlled) {
            return (
                <Controller
                    key={id}
                    name={id}
                    control={form.control}
                    shouldUnregister={true}
                    defaultValue={defaultValue || ""}
                    render={({ field }) => {
                        return React.cloneElement(oldElement, {
                            ...oldElement.props,
                            ...field,
                        });
                    }}
                />
            );
        }

        const additionalProps = {
            ...form.register(id, {
                ...(oldElement.props.options ? oldElement.props.options : {}),
            }),
            value: defaultValue,
        };
        const niveauElement = React.cloneElement(oldElement, {
            ...oldElement.props,
            ...additionalProps,
        });

        // if (defaultValue) {
        //     form.setValue(id, defaultValue);
        // }

        return niveauElement;
    };

    React.useEffect(() => {
        if (!addInitial) return;

        let newElementData = [];
        for (let x = 0; x < min; x++) {
            newElementData.push({
                elements: formElements.map(elem => modifyElement(elem, x)),
                id: uuidv4(),
                default: false,
            });
        }

        setElementData(newElementData);
    }, []);

    const setFields = (newData, controlled) => {
        setElementData(
            newData.map((data, index) => {
                return {
                    elements: formElements.map((elem, i) =>
                        modifyElement(elem, index, data[i], controlled)
                    ),
                    id: uuidv4(),
                    default: true,
                };
            })
        );
    };

    const addField = ({
        defaultValues = undefined,
        controlled = true,
    } = {}) => {
        if (elementData.length >= max) return;
        setElementData(prev => [
            ...prev,
            {
                elements: formElements.map((elem, index) =>
                    modifyElement(
                        elem,
                        prev.length,
                        defaultValues && defaultValues[index],
                        controlled
                    )
                ),
                id: uuidv4(),
                default: false,
            },
        ]);
    };

    const deleteField = index => {
        setElementData(prev => {
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
        elementData.forEach((_, elementIndex) => {
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
        elementData,
        unwrap,
        deleteField,
        addField,
        setFields,
        isMax: elementData.length >= max,
        isMin: elementData.length <= min,
    };
};

export default useDynamicFields;
