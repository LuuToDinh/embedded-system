import { useState, useEffect } from 'react'
import axios from '../../axios'
import ControllItem from './ControllItem'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

const Index = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.isLogin)

    const [isSetting, setIsSetting] = useState(false)
    const [pumpData, setPumpData] = useState()
    const [oxygenPumpData, setOxygenPumpData] = useState()

    const handleSetting = () => {
        setIsSetting((prev) => {
            if (prev) {
                axios.post('/pump', { value: pumpData.curValue })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

                axios.post('/oxy', { value: oxygenPumpData.curValue })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            }
            return !prev
        })
    }

    useEffect(() => {
        if (!user) navigate('/')
    }, [user]) 

    useEffect(() => {
        axios.get('/pump')
            .then(res => {
                setPumpData({
                    title: 'Pump',
                    minValue: 0,
                    maxValue: 4,
                    curValue: res.data[0].value,
                    calculationUnit: '',
                    isOpen: res.data[0].value > 0 ? true : false
                })
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('/oxy')
            .then(res => {
                setOxygenPumpData({
                    title: 'OxygenPump',
                    minValue: 0,
                    maxValue: 1,
                    curValue: res.data[0].value,
                    calculationUnit: '',
                    isOpen: res.data[0].value > 0 ? true : false
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {pumpData != null && oxygenPumpData != null
                ?
                <>
                    <div className="text-end mb-4">
                        <button
                            onClick={handleSetting}
                            className={`inline-block rounded px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ${isSetting ? "bg-green-600" : "bg-gray-800"}`}
                        >
                            {isSetting ? 'Update' : 'Setting'}
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <ControllItem isSetting={isSetting} data={pumpData} setDataFunction={setPumpData} />
                        <ControllItem isSetting={isSetting} data={oxygenPumpData} onOffOnly={true} setDataFunction={setOxygenPumpData} />
                    </div>
                </>
                :
                <div className="h-full flex flex-col justify-center">
                    <p className="text-center">Loadding...</p>
                </div>
            }
        </>
    )
}

export default Index