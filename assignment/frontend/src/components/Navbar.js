import { AiOutlineFundView } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineControl } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/user/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mainLink = [
    {
      icon: <AiOutlineFundView />,
      title: 'Overview',
    },
    {
      icon: <IoMdNotificationsOutline />,
      title: 'Notification',
    },
    // {
    //     icon: <AiOutlineControl />,
    //     title: 'Controll'
    // },
  ];

  const secondLink = [
    {
      icon: <BiLogOut />,
      title: 'Logout',
      onClick: () => {
        // ...
        dispatch(signOut());
        navigate('/');
      },
    },
  ];
  const navLinkClass = ({ isActive }) => {
    const stylenav =
      'flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded';
    return isActive ? `${stylenav} bg-gray-600` : `${stylenav}`;
  };

  return (
    <>
      <div className='navbar-menu relative z-50'>
        <div className='navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10'></div>
        <div className='flex flex-col h-screen pt-6 pb-8 bg-gray-800 overflow-y-auto'>
          <div className='px-4 pb-6'>
            <h3 className='mb-2 text-xs uppercase text-gray-500 font-medium'>
              Main
            </h3>
            <div className='text-sm font-medium'>
              {mainLink.map((item, index) => (
                <div key={index}>
                  <NavLink to={'/' + item.title} className={navLinkClass}>
                    <span className='inline-block mr-3'>{item.icon}</span>
                    <span>{item.title}</span>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
          <div className='px-4 pb-6'>
            <h3 className='mb-2 text-xs uppercase text-gray-500 font-medium'>
              Second
            </h3>
            {secondLink.map((item, index) => (
              <div key={index}>
                <button
                  onClick={item.onClick || function () {}}
                  className='flex items-center w-full pl-3 py-3 pr-2 text-sm font-medium text-gray-50 hover:bg-gray-900 rounded'
                >
                  <span className='inline-block mr-3'>{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
