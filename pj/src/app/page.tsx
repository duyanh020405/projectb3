"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../app/logo.png";
import { Button } from "@/components/ui/button";
import img1 from "@/img/img1.png";
import img2 from "@/img/664dda14edbfae2d6d29f459b05993b3.jpg";
import img3 from "@/img/1.jpg";
import img4 from "@/img/img5.jpg";
import s1 from "@/components/img2/ban-ve-thiet-ke-shop-thoi-trang-1.jpg";
import s2 from "@/components/img2/phoi-ao-thun-nam-voi-quan-au.webp";
import s3 from "@/components/img2/quan-ao-doi-nam-nu-thu-dong.jpg";
import s4 from "@/components/img2/shop-ban-quan-ao-nam-gia-re-tphcm-min.jpg";
import s5 from "@/components/img2/t.jpg";
import s6 from "@/components/img2/thiet-ke-shop-quan-ao-nu-nho-dep-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./service/products.service";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoMdPhoneLandscape } from "react-icons/io";
import { MdEmail, MdOutlineShoppingCart } from "react-icons/md";
import { FaHome, FaPhoneAlt, FaSearch, FaUserCircle } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

export default function RotatingMessages() {
  // trang quang cao 
  const adImages = [img1, img2, img3, img4, img1, img2, img3];

  const { products }: any = useSelector((state: any) => state.products);

  // const products = Array.isArray(data)? data : [...data];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const messages = [
    { text: "Free ship toàn quốc với các sản phẩm trên 500k", href: "" },
    { text: "Sản phẩm được bảo hành", href: "" },
    { text: "Đổi trả sản phẩm sau 7 ngày", href: "" },
    { text: "Hotline mua hàng : (098) 786 4321", href: "" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const images = [s1, s2, s3, s4, s5, s6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Phân trang

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
    console.log(event.target.value);
  };
/////////////////////////////////////

  const filteredAndSearchedProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Logo */}
      <div className="flex justify-center items-center py-8">
        <Image src={logo} alt="Logo" width={300} height={130} />
      </div>

      {/* Introduction */}
      <div className="text-center opacity-70 mb-8">
        <h1 className="text-3xl font-bold text-hsl(218, 51%, 25%)">
          Shop KenTa.vn
        </h1>
        <p>
          Nơi mà bạn có thể lựa chọn cho mình những bộ trang phục ưng ý nhất
        </p>
      </div>
      <br />
      {/* Select options for products */}
      <div className="flex flex-wrap justify-center gap-4">
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Áo khoác" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ni">Áo nỉ</SelectItem>
            <SelectItem value="du">Áo dù</SelectItem>
            <SelectItem value="kaki">Áo kaki</SelectItem>
            <SelectItem value="playze_nam">Playze nam</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Áo thun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thunn">Áo thun ngắn</SelectItem>
            <SelectItem value="thund">Áo thun dài</SelectItem>
            <SelectItem value="thunpl">Áo thun polo</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Áo sơ mi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="somin">Áo sơ mi ngắn tay</SelectItem>
            <SelectItem value="somid">Áo sơ mi dài tay</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Quần dài" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quanj">Quần dài jean</SelectItem>
            <SelectItem value="quank">Quần dài kaki</SelectItem>
            <SelectItem value="quanv">Quần dài vải</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Quần short" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shortt">Quần thun</SelectItem>
            <SelectItem value="shorttay">Quần tây</SelectItem>
            <SelectItem value="shortd">Quần dù</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Phụ kiện khác" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="watch">Đồng hồ</SelectItem>
            <SelectItem value="bracelet">Vòng tay</SelectItem>
            <SelectItem value="tie">Cà vạt</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <br />

      {/* Image rotation with buttons */}
      <div className="mt-12 flex justify-center items-center relative">
        <button
          onClick={prevImage}
          className="absolute left-0 px-4 py-2 bg-gray-300 rounded-full opacity-50 hover:opacity-80"
        >
          <GrLinkPrevious />
        </button>

        <div className="overflow-hidden max-w-screen-lg">
          <Image
            src={adImages[currentImageIndex]}
            alt="Rotating image"
            width={1500}
            height={600}
            className="object-cover w-full h-500"
          />
        </div>

        <button
          onClick={nextImage}
          className="absolute right-0 px-4 py-2 bg-gray-300 rounded-full opacity-50 hover:opacity-80"
        >
          <GrLinkNext />
        </button>
      </div>

      {/* Select options for products */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Select components here */}
      </div>

      {/* Search and icons */}
      <div className="flex items-center space-x-4 mt-8">
        <form className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="max-w-sm"
          />
          <Button type="button">
            <FaSearch />
          </Button>
        </form>
        <MdOutlineShoppingCart style={{ width: "40px", height: "40px" }} />
        <FaUserCircle style={{ width: "40px", height: "40px" }} />
      </div>

      {/* Pagination */}

      {/* Footer */}
      <footer
        className="text-center text-lg-start bg-body-tertiary text-muted"
        style={{ position: "relative", width: "100%" }}
      >
        {/** quang cao 22222222222222222222222 */}
        <div className="marquee-container"></div>
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-google" />
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-github" />
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3" />
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3" />
                  <FaHome /> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  <MdEmail /> info@example.com
                </p>
                <p>
                  <i className="fas fa-phone me-3" />
                  <FaPhoneAlt /> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3" />
                  <IoMdPhoneLandscape /> + 01 234 567 89
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
}
