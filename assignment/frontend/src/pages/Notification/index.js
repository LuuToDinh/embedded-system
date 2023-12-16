import { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.isLogin);

  const [data, setData] = useState([]);

  const [isSetting, setIsSetting] = useState(false);
  const [contrainsTemperature, setContrainsTemperature] = useState({
    title: 'Temperature',
  });
  const [contrainsLight, setContrainsLight] = useState({
    title: 'Light',
  });
  const [contrainsHumidity, setContrainsHumidity] = useState({
    title: 'Humidity',
  });

  const handleClickSetting = () => {
    setIsSetting((prev) => {
      if (prev) {
        axios
          .post('/threshold', {
            type: 'temp',
            min: contrainsTemperature.min,
            max: contrainsTemperature.max,
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        axios
          .post('/threshold', {
            type: 'lux',
            min: contrainsLight.min,
            max: contrainsLight.max,
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        axios
          .post('/threshold', {
            type: 'humidity',
            min: contrainsHumidity.min,
            max: contrainsHumidity.max,
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  useEffect(() => {
    axios
      .get('/threshold')
      .then((data) => {
        data.data.map((dataItem) => {
          if (dataItem.type === 'temp') {
            setContrainsTemperature((prev) => ({
              ...prev,
              min: dataItem.min,
              max: dataItem.max,
            }));
          }
          if (dataItem.type === 'lux') {
            setContrainsLight((prev) => ({
              ...prev,
              min: dataItem.min,
              max: dataItem.max,
            }));
          }
          if (dataItem.type === 'humidity') {
            setContrainsHumidity((prev) => ({
              ...prev,
              min: dataItem.min,
              max: dataItem.max,
            }));
          }
        });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get('/notification')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {contrainsHumidity.min && contrainsHumidity.max ? (
        <>
          <div className='text-end mb-4'>
            <button
              onClick={handleClickSetting}
              className={`inline-block rounded px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ${
                isSetting ? 'bg-green-600' : 'bg-gray-800'
              }`}
            >
              {isSetting ? 'Update' : 'Setting'}
            </button>
          </div>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-3 p-4 shadow-lg bg-white rounded-md'>
              <p className='text-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>
                Constraint Data
              </p>
              <div className='my-2'>
                <div className='flex items-center justify-between'>
                  <span className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500'>
                    {contrainsTemperature.title}
                  </span>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      disabled={!isSetting}
                      onChange={(e) =>
                        setContrainsTemperature((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      value={contrainsTemperature.min}
                      className='block w-10 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                    />
                    <span className='mx-2'>-</span>
                    <input
                      type='text'
                      disabled={!isSetting}
                      onChange={(e) =>
                        setContrainsTemperature((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      value={contrainsTemperature.max}
                      className='block w-10 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500'>
                    {contrainsLight.title}
                  </span>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      disabled={!isSetting}
                      onChange={(e) =>
                        setContrainsLight((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      value={contrainsLight.min}
                      className='block w-10 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                    />
                    <span className='mx-2'>-</span>
                    <input
                      type='text'
                      disabled={!isSetting}
                      onChange={(e) =>
                        setContrainsLight((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      value={contrainsLight.max}
                      className='block w-10 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500'>
                    {contrainsHumidity.title}
                  </span>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      disabled={!isSetting}
                      onChange={(e) =>
                        setContrainsHumidity((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      value={contrainsHumidity.min}
                      className='block w-10 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                    />
                    <span className='mx-2'>-</span>
                    <input
                      type='text'
                      disabled={!isSetting}
                      onChange={(e) =>
                        setContrainsHumidity((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      value={contrainsHumidity.max}
                      className='block w-10 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className='col-span-9 p-4 overflow-y-scroll no-scrollbar shadow-lg bg-white rounded-md'
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              {data.map((item, index) => (
                <div key={index} className={' ' + (index !== 0 ? 'mt-4' : '')}>
                  <NotificationItem
                    time={item.time}
                    title={item.title}
                    content={item.content}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='h-full flex flex-col justify-center'>
            <p className='text-center'>Loadding...</p>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
