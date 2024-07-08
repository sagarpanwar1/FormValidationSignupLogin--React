
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const countryStateCityData = {
//     USA: {
//       states: {
//         California: ["Los Angeles", "San Francisco"],
//         Texas: ["Houston", "Dallas"],
//       },
//     },
//     India: {
//       states: {
//         Maharashtra: ["Mumbai", "Pune"],
//         Gujarat: ["Ahmedabad", "Surat"],
//       },
//     },
//   };

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      country: 'Select Country',
      state: 'Select State',
      city: 'Select City',
      pincode: '',
      mobile: '',
      fax: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
  
    const countries = ['Select Country', 'USA', 'India'];
    const states = {
      USA: ['Select State', 'California', 'New York'],
      India: ['Select State', 'Maharashtra', 'Karnataka']
    };
    const cities = {
      California: ['Select City', 'Los Angeles', 'San Francisco'],
      'New York': ['Select City', 'New York City', 'Buffalo'],
      Maharashtra: ['Select City', 'Mumbai', 'Pune'],
      Karnataka: ['Select City', 'Bangalore', 'Mysore']
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
  
      // Clear validation error when user starts typing
      if (errors[name]) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
  
      // Clear dependent fields when changing country or state
      if (name === 'country') {
        setFormData(prevFormData => ({
          ...prevFormData,
          state: 'Select State',
          city: 'Select City'
        }));
      } else if (name === 'state') {
        setFormData(prevFormData => ({
          ...prevFormData,
          city: 'Select City'
        }));
      }
    };
  
    const handleValidation = () => {
      let tempErrors = {};
      let isValid = true;
  
      // First name validation
      if (formData.firstName.trim().length === 0) {
        tempErrors["firstName"] = "First name is required.";
        isValid = false;
      }
  
      // Last name validation
      if (formData.lastName.trim().length === 0) {
        tempErrors["lastName"] = "Last name is required.";
        isValid = false;
      }
  
      // Email validation
      if (!formData.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
        tempErrors["email"] = "Email is not valid.";
        isValid = false;
      }
  
      // Address validation
      if (formData.address.trim().length === 0) {
        tempErrors["address"] = "Address is required.";
        isValid = false;
      }
  
      // Country validation
      if (formData.country === 'Select Country') {
        tempErrors["country"] = "Country is required.";
        isValid = false;
      }
  
      // State validation
      if (formData.state === 'Select State') {
        tempErrors["state"] = "State is required.";
        isValid = false;
      }
  
      // City validation
      if (formData.city === 'Select City') {
        tempErrors["city"] = "City is required.";
        isValid = false;
      }
  
      // Pincode validation
      if (!formData.pincode.match(/^\d{5,6}$/)) {
        tempErrors["pincode"] = "Pincode is not valid.";
        isValid = false;
      }
  
      // Mobile validation
      if (!formData.mobile.match(/^\d{10}$/)) {
        tempErrors["mobile"] = "Mobile number is not valid.";
        isValid = false;
      }
  
      // Password validation
      if (formData.password.length < 6) {
        tempErrors["password"] = "Password must be at least 6 characters long.";
        isValid = false;
      }
  
      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        tempErrors["confirmPassword"] = "Passwords do not match.";
        isValid = false;
      }
  
      setErrors(tempErrors);
      return isValid;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);
  
      if (handleValidation()) {
        setTimeout(() => {
          localStorage.setItem('user', JSON.stringify(formData));
          location.reload();
        }, 1000);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          country: 'Select Country',
          state: 'Select State',
          city: 'Select City',
          pincode: '',
          mobile: '',
          fax: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    };
  
    return (
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
  
          {/* First Name and Last Name */}
          <div className="form-group">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-control ${errors.firstName && 'is-invalid'}`}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-lg-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-control ${errors.lastName && 'is-invalid'}`}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>
          </div>
  
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email && 'is-invalid'}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
  
          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-control ${errors.address && 'is-invalid'}`}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
  
          {/* Country, State, City */}
          <div className="form-group">
            <div className="row">
              <div className="col-lg-4">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`form-control ${errors.country && 'is-invalid'}`}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
              </div>
              <div className="col-lg-4">
                <label>State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`form-control ${errors.state && 'is-invalid'}`}
                  disabled={formData.country === 'Select Country' || formData.country === ''}
                >
                  {formData.country !== 'Select Country' && states[formData.country]?.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </div>
              <div className="col-lg-4">
                <label>City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-control ${errors.city && 'is-invalid'}`}
                  disabled={formData.state === 'Select State' || formData.state === ''}
                >
                  {formData.state !== 'Select State' && cities[formData.state]?.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>
          </div>
  
          {/* Pincode */}
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`form-control ${errors.pincode && 'is-invalid'}`}
            />
            {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
          </div>
  
          {/* Mobile Number */}
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`form-control ${errors.mobile && 'is-invalid'}`}
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>
  
          {/* Fax */}
          <div className="form-group">
            <label>Fax</label>
            <input
              type="text"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
              className={`form-control ${errors.fax && 'is-invalid'}`}
            />
            {errors.fax && <div className="invalid-feedback">{errors.fax}</div>}
          </div>
  
          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-control ${errors.phone && 'is-invalid'}`}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
  
          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password && 'is-invalid'}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
  
          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
  
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    );
  }
  

export default SignUp