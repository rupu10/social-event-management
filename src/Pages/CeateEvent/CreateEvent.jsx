import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useImageUpload from "../../hooks/useImageUpload";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage, loading: imgLoading, error: imgError } = useImageUpload();

  const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "";
  const timestamp = selectedDate ? selectedDate.getTime() : null;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      try {
        const result = await uploadImage(file);
        if (result?.url) {
          setUploadedUrl(result.url);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all required fields
    if (!uploadedUrl) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please upload an event thumbnail first!",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsSubmitting(false);
      return;
    }

    if (!selectedDate) {
      Swal.fire({
        icon: "warning",
        title: "Date Required",
        text: "Please select an event date!",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsSubmitting(false);
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate other required fields
    if (!data.title?.trim() || !data.description?.trim() || !data.location?.trim() || !data.eventType) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields!",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare event data
    const eventData = {
      ...data,
      eventDate: formattedDate,
      eventDateNumber: timestamp,
      thumbnail: uploadedUrl,
      createdAt: new Date().toISOString(),
      status: "upcoming"
    };

    try {
      const res = await axios.post(
        "https://social-management-server.vercel.app/events",
        eventData
      );

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Event Created Successfully!",
          text: "Your event has been saved and published.",
          showConfirmButton: false,
          timer: 2000,
          background: "#1f2937",
          color: "white",
        });
        
        // Reset form
        form.reset();
        setSelectedDate(null);
        setUploadedUrl("");
        setImageFile(null);
        
        setTimeout(() => {
          navigate("/upComingEvents");
        }, 2000);
      }
    } catch (error) {
      console.error("Event creation error:", error);
      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: "Failed to create event. Please try again.",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
        value ? 'text-gray-900' : 'text-gray-500'
      }`}
    >
      {value || placeholder}
      <span className="float-right">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </span>
    </button>
  ));

  

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="w-10/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold -900 mb-3">Create New Event</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Fill in the details below to create an amazing event for your community
          </p>
          <div className="mt-4 text-sm text-red-500">
            * All fields are required
          </div>
        </div>

        {/* Form Section */}
        <div className=" rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Event Information</h2>
          </div>
          
          <form onSubmit={handleAddEvent} className="p-6 space-y-6">
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter event title"
                />
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Brief event description"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium ">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Event venue or address"
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium ">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="eventType"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select event type</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Image Upload - REQUIRED */}
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium ">
                  Event Thumbnail <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  uploadedUrl 
                    ? 'border-green-400 bg-green-50' 
                    : imgError 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="thumbnail-upload"
                    required
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        uploadedUrl ? 'bg-green-100' : imgError ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {uploadedUrl ? (
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : imgError ? (
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          uploadedUrl ? 'text-green-900' : imgError ? 'text-red-900' : ''
                        }`}>
                          {imageFile ? imageFile.name : "Click to upload thumbnail"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 32MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {/* Upload Status */}
                <div className="mt-2">
                  {imgLoading && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Uploading image...</span>
                    </div>
                  )}
                  {imgError && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{imgError}</span>
                    </div>
                  )}
                  {uploadedUrl && !imgLoading && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Image uploaded successfully!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Creator Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Creator's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="creator_name"
                  required
                  defaultValue={user?.displayName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Creator's Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="creator_email"
                  required
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your email"
                  readOnly
                />
              </div>

              {/* Date Picker - No Manual Typing Allowed */}
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                  placeholderText="Click to select date"
                  customInput={<CustomDateInput />}
                  showPopperArrow={false}
                  required
                  withPortal
                  shouldCloseOnSelect={true}
                  className="w-full"
                />
                {selectedDate && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected date: {selectedDate.toDateString()}
                  </p>
                )}
                <input type="hidden" name="eventDate" value={formattedDate} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting || imgLoading || !selectedDate || !uploadedUrl}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Event...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Create Event</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;