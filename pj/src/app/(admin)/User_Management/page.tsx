"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { TiThMenu } from 'react-icons/ti';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import Image from 'next/image';
import logo from '@/app/logo.png';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function Page() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for password visibility

  const activeStyle = "bg-blue-500 text-white";
  const inactiveStyle = "bg-gray-300 text-black";

  const logoutAdmin = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmed) {
      localStorage.setItem('admin', '');
      router.push('/login');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChoice = (item: string) => {
    setSelectedItem(item);
    localStorage.setItem('choiceManager', JSON.stringify(item));
    router.push(`/${item}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    setSearchTerm('');
  };

  const openModal = (user: any) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentUser(null);
  };

  const handleBlockToggle = async () => {
    if (currentUser) {
      try {
        await axios.patch(`http://localhost:8080/user/${currentUser.id}`, {
          block: !currentUser.block
        });
        setUsers(users.map(user =>
          user.id === currentUser.id ? { ...user, block: !currentUser.block } : user
        ));
        closeModal();
      } catch (error) {
        console.error('Error updating user block status:', error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center py-8">
        <Image src={logo} alt="Logo" width={300} height={130} />
      </div>

      <div className="text-center opacity-70 mb-8">
        <h1 className="text-3xl font-bold text-hsl(218, 51%, 25%)">Shop KenTa.vn</h1>
        <p>Nơi mà bạn có thể lựa chọn cho mình những bộ trang phục ưng ý nhất</p>
      </div>

      <div className="flex justify-center items-center mb-4">
        <h1>Admin Work in here !</h1>
        <FaRegUserCircle className="mr-2 text-lg" />
        <span className="text-lg">Duy Anh</span>
        
        <IoIosLogOut onClick={logoutAdmin} className="text-red-500 cursor-pointer ml-2 text-xl" />
      </div>

      <div className="flex justify-center items-center mb-4">
        <FaRegUserCircle className="mr-2 text-lg" />
        <span className="text-lg">{users.length > 0 ? users[0].name : 'Loading...'}</span>
        <IoIosLogOut onClick={logoutAdmin} className="text-red-500 cursor-pointer ml-2 text-xl" />
      </div>

      <div className="container mx-auto">
        <div className="flex" style={{ display: 'flex', flexDirection: 'row', gap: 50 }}>
          <div className="bg-gray-800 text-white p-4 w-[300px]">
            <h2 className="text-lg mb-4"><TiThMenu />Mục lựa chọn :</h2>
            <button
              className={`block w-full mb-4 py-2 ${selectedItem === 'admin' ? activeStyle : inactiveStyle}`}
              onClick={() => handleChoice('admin')}
            >
              Admin
            </button>
            <button
              className={`block w-full mb-4 py-2 ${selectedItem === 'User_Management' ? activeStyle : inactiveStyle}`}
              onClick={() => handleChoice('User_Management')}
            >
              User Management
            </button>
            <button
              className={`block w-full py-2 ${selectedItem === 'createProducts' ? activeStyle : inactiveStyle}`}
              onClick={() => handleChoice('createProducts')}
            >
              Create Products
            </button>
          </div>

          <div className="relative border border-black p-4 w-[1000px] h-[600px] overflow-auto bg-white">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 w-full"
              />
              <button
                onClick={handleReset}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Reset
              </button>
            </div>

            <table className="min-w-full border-collapse border border-gray-300 text-left table-auto">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Password</th>
                  <th className="border border-gray-300 px-4 py-2">Phone</th>
                  <th className="border border-gray-300 px-4 py-2">Address</th>
                  <th className="border border-gray-300 px-4 py-2">Card</th>
                  <th className="border border-gray-300 px-4 py-2">Buy</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? filteredUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-200">
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={user.password}
                          readOnly
                          className="border p-2 w-full"
                          style={{ fontFamily: 'monospace' }} // Monospace font for password field
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-2 flex items-center"
                        >
                          {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.card}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.buy}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => openModal(user)}
                        className={`py-2 px-4 rounded ${user.block ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      >
                        {user.block ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {currentUser && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={closeModal}
          onConfirm={handleBlockToggle}
          userName={currentUser.name}
        />
      )}
    </div>
  );
}