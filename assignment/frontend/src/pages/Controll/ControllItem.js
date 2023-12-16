import { useState } from 'react'
import Slider from '@mui/material/Slider'
import { BiLock } from 'react-icons/bi';
const ControllItem = ({ data, isSetting, onOffOnly = false, setDataFunction }) => {
    const [toggle, setToggle] = useState(data.isOpen);
    const [valueSlider, setValueSlider] = useState(+data.curValue);

    const marks = [
        {
            value: data.minValue,
            label: data.minValue + data.calculationUnit,
        },
        {
            value: (data.maxValue + data.minValue) * 0.25,
            label: (data.maxValue + data.minValue) * 0.25 + data.calculationUnit,
        },
        {
            value: (data.maxValue + data.minValue) * 0.5,
            label: (data.maxValue + data.minValue) * 0.5 + data.calculationUnit,
        },
        {
            value: (data.maxValue + data.minValue) * 0.75,
            label: (data.maxValue + data.minValue) * 0.75 + data.calculationUnit,
        },
        {
            value: data.maxValue,
            label: data.maxValue + data.calculationUnit,
        },
    ];
    const handleToggle = () => {
        if (isSetting) {
            setToggle((prev) => {
                if (!prev) {
                    setValueSlider(1)
                    setDataFunction((prev) => ({ ...prev, curValue: 1 }))
                }
                else {
                    setValueSlider(0)
                    setDataFunction((prev) => ({ ...prev, curValue: 0 }))
                }
                return !prev
            })
        }
    }
    const handleOnchangeSlider = (e) => {
        if (toggle) {
            setValueSlider(e.target.value)
            setDataFunction((prev) => ({ ...prev, curValue: e.target.value }))
        }
    }

    return (
        <>
            <div className="w-full p-4 shadow-lg bg-white rounded-md">
                <div className="w-full flex items-center justify-between">
                    <div >
                        <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded">{data.title}</span>
                    </div>
                    <div className="flex items-center">
                        {
                            !isSetting &&
                            <span className="text-red-500 text-lg px-2.5">
                                <BiLock />
                            </span>
                        }
                        <div
                            className={"w-10 h-6 flex items-center rounded-full p-1 cursor-pointer" + (toggle ? " bg-green-600" : " bg-gray-400")}
                            onClick={handleToggle}
                        >
                            <div
                                className={
                                    "h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
                                    (toggle ? " bg-white transform translate-x-4" : " bg-black")
                                }
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="px-4 mt-4">
                    {!onOffOnly && <Slider onChange={(e) => handleOnchangeSlider(e)} disabled={!isSetting} value={toggle ? valueSlider : 0} min={data.minValue} max={data.maxValue} marks={marks} valueLabelDisplay="auto" />}
                </div>
            </div>
        </>
    )
}

export default ControllItem