import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Laptop = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState();
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [brands, setBrands] = useState([]);
  const [address, setAddress] = useState("");
  const [models, setModels] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [facilityData, setFacilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("https://elocate-server.onrender.com/api/v1/facility")
      .then((response) => {
        setFacilityData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching facilities:", error);
      });
  }, []);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedFacility("");

    if (brand) {
      const selectedBrand = brands.find((b) => b.brand === brand);
      if (selectedBrand) {
        setModels(selectedBrand.models);
      }
    }
  };

  useEffect(() => {
    const fetchBrandsAndModels = () => {
      const laptopBrandsData = [
        // Your brand data here
      ];
      setBrands(laptopBrandsData);
      setModels([]);
    };
    fetchBrandsAndModels();
  }, []);

  const email = "user@example.com"; // Replace with actual function call
  const userId = "user-id"; // Replace with actual function call
  const phone = "1234567890"; // Replace with actual function call
  const fullname = "John Doe"; // Replace with actual function call

  const handleSubmit = async () => {
    const recycleItem = selectedBrand + selectedModel;

    if (recycleItem && selectedFacility && recycleItemPrice && pickupDate && pickupTime && fullname && phone && address && fullname && email && userId) {
      const newBooking = {
        userId: userId,
        userEmail: email,
        recycleItem,
        recycleItemPrice,
        pickupDate,
        pickupTime,
        facility: selectedFacility,
        fullName: fullname,
        address: address,
        phone: phone,
      };

      setBookingData([...bookingData, newBooking]);
      setIsLoading(true);

      try {
        const response = await axios.post("https://elocate-server.onrender.com/api/v1/booking", newBooking, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success("Submitted successfully!", { autoClose: 3000 });
          setSelectedBrand("");
          setSelectedModel("");
          setSelectedFacility("");
          setRecycleItemPrice(0);
          setPickupDate("");
          setPickupTime("");
          setAddress("");
          setIsLoading(false);
        } else {
          toast.error("Error submitting data.", { autoClose: 3000 });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error submitting data.", { autoClose: 3000 });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all the required fields.", { autoClose: 3000 });
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Submitting...</span>
        </div>
        <div className="ml-2">Submitting...</div>
      </div>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container my-5">
      <ToastContainer />

      <h1 className="text-center mb-4">Laptop Recycling</h1>
      <form
        className="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-md-6">
          <label htmlFor="brand" className="form-label">Select Brand:</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="form-select"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brand} value={brand.brand}>
                {brand.brand}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="model" className="form-label">Select Model:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="form-select"
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="recycleItemPrice" className="form-label">Recycle Item Price:</label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice}
            onChange={(e) => setRecycleItemPrice(Number(e.target.value))}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="pickupDate" className="form-label">Pickup Date:</label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            min={currentDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="pickupTime" className="form-label">Pickup Time:</label>
          <input
            type="time"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="address" className="form-label">Location:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone || ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="facility" className="form-label">Select Facility:</label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="form-select"
          >
            <option value="">Select Facility</option>
            {facilityData.map((facility) => (
              <option key={facility.name} value={facility.name}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Laptop;
