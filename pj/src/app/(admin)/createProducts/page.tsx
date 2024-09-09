"use client";
import logo from '@/app/logo.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import Image from "next/image";

export default function Page() {
  const generateRandomId = () => Math.random().toString(36).substr(2, 9);

  const [newType, setNewType] = useState('');
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [newProduct, setNewProduct] = useState({
    id: generateRandomId(),
    name: '',
    price: 0,
    img: '',
    size: '',
    quantity: 0,
    category: '',
    description: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors: any = {};

    if (!newProduct.name) {
      valid = false;
      tempErrors.name = 'Tên sản phẩm là bắt buộc';
    }
    if (!newProduct.price || newProduct.price <= 0) {
      valid = false;
      tempErrors.price = 'Giá sản phẩm phải lớn hơn 0';
    }
    if (!newProduct.img) {
      valid = false;
      tempErrors.img = 'Hình ảnh sản phẩm là bắt buộc';
    }
    if (!newProduct.quantity || newProduct.quantity <= 0) {
      valid = false;
      tempErrors.quantity = 'Số lượng phải lớn hơn 0';
    }
    if (!newProduct.description) {
      valid = false;
      tempErrors.description = 'Mô tả sản phẩm là bắt buộc';
    }
    if (!newProduct.size) {
      valid = false;
      tempErrors.size = 'Vui lòng chọn kích thước';
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (showNewTypeInput && newType !== '') {
      newProduct.category = newType;
    }

    axios
      .post('http://localhost:8080/products', newProduct)
      .then(() => {
        alert('Thêm sản phẩm mới thành công!');
        setNewProduct({
          id: generateRandomId(),
          name: '',
          price: 0,
          img: '',
          size: '',
          quantity: 0,
          category: '',
          description: '',
        });
      })
      .catch((error) => console.error('Lỗi khi thêm sản phẩm:', error));
  };

  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowNewTypeInput(true);
    } else {
      setShowNewTypeInput(false);
      setNewProduct((prev) => ({ ...prev, category: value }));
    }
  };

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string>('');
  
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
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      if (parsedAdmin.email !== 'duyanh2005@gmail.com') {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    
    const storedItem = localStorage.getItem('choiceManager');
    if (storedItem) {
      setSelectedItem(JSON.parse(storedItem));
    }
  }, [router]);

  const handleChoice = (item: string) => {
    setSelectedItem(item);
    localStorage.setItem('choiceManager', JSON.stringify(item));
    router.push(`/${item}`);
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
        <FaRegUserCircle className="mr-2 text-lg" />
        <span className="text-lg">Duy Anh</span>
        <h1>Admin Work in here !</h1>
        <IoIosLogOut onClick={logoutAdmin} className="text-red-500 cursor-pointer ml-2 text-xl" />
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <div className="bg-gray-800 text-white p-4 w-[300px]">
            <h2 className="text-lg mb-4"> {selectedItem}</h2>
            <button 
                className={`block w-full mb-4 py-2 ${selectedItem === 'User_Management' ? activeStyle : inactiveStyle}`} 
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

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md ml-8">
            <h1 className="text-2xl font-semibold mb-4">Tạo sản phẩm mới:</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  id="productName"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="productImg" className="block text-gray-700 mb-2">Link hình ảnh sản phẩm</label>
                <input
                  type="text"
                  id="productImg"
                  name="img"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.img}
                  onChange={handleChange}
                />
                {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="productPrice" className="block text-gray-700 mb-2">Giá sản phẩm</label>
                <input
                  type="number"
                  id="productPrice"
                  name="price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="productCategory" className="block text-gray-700 mb-2">Thể loại</label>
                <select
                  id="productCategory"
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Chọn thể loại</option>
                  <option value="ni">Áo nỉ</option>
                  <option value="du">Áo dù</option>
                  {/* Add other options */}
                  <option value="new">Thêm loại mới</option>
                </select>
              </div>

              {showNewTypeInput && (
                <div className="mb-4">
                  <label htmlFor="newTypeInput" className="block text-gray-700 mb-2">Loại mới</label>
                  <input
                    type="text"
                    id="newTypeInput"
                    name="newType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="productDescription" className="block text-gray-700 mb-2">Mô tả sản phẩm</label>
                <textarea
                  id="productDescription"
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProduct.description}
                  onChange={handleChange}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Tạo sản phẩm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
