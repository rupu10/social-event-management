import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";
import useImageUpload from "../../../hooks/useImageUpload";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaImage, FaTrash, FaEdit } from "react-icons/fa";

const UpdateMyEvent = () => {
  const navigate = useNavigate();
  const {
    creator_email,
    creator_name,
    description,
    location,
    title,
    thumbnail,
    _id,
    eventDate,
    eventType
  } = useLoaderData();

  const [selectedDate, setSelectedDate] = useState(eventDate ? new Date(eventDate) : null);
  const [uploadedUrl, setUploadedUrl] = useState(thumbnail);
  const [imageFile, setImageFile] = useState(null);
  const { uploadImage, loading: imgLoading, error: imgError } = useImageUpload();

  const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "";
  const timestamp = selectedDate ? selectedDate.getTime() : null;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      try {
        const result = await uploadImage(file);
        if (result) {
          setUploadedUrl(result);
          Swal.fire({
            icon: "success",
            title: "Image Uploaded!",
            text: "Your event thumbnail has been updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Failed to upload image. Please try again.",
          timer: 3000,
        });
      }
    }
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Use uploaded URL if available, otherwise use the original thumbnail
    data.thumbnail = uploadedUrl || thumbnail;
    data.eventDate = formattedDate;
    data.eventDateNumber = timestamp;
    
    const updatedEvent = data;

    axios
      .put(`http://localhost:7000/events/${_id}`, updatedEvent)
      .then((res) => {
        console.log(res.data);
        if (!res.data.modifiedCount) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You must fill every required data",
          });
        }
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Event updated successfully!",
            text: "Your event has been updated with the latest changes.",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/upComingEvents");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update event. Please try again.",
        });
      });
  };

  const handleDeleteEvent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:7000/events/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your event has been permanently deleted.",
                icon: "success",
              });
              navigate("/manageMyEvents");
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Delete Failed",
              text: "Failed to delete event. Please try again.",
            });
          });
      }
    });
  };

  const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={`w-full px-4 py-3 border border-base-300 rounded-lg text-left focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
        value ? 'text-base-content border-primary' : 'text-base-content/70'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{value || placeholder}</span>
        <FaCalendarAlt className="text-base-content/50" />
      </div>
    </button>
  ));

  return (
    <div className="min-h-screen py-8 px-4 bg-base-200">
      <div className="md:w-10/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-3">Update Your Event</h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Make changes to your event details and keep your audience informed
          </p>
        </div>

        {/* Update Form Section */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary px-6 py-4">
            <h2 className="text-xl font-semibold text-primary-content flex items-center gap-2">
              <FaEdit className="w-5 h-5" />
              Event Information
            </h2>
          </div>
          
          <form onSubmit={handleUpdateEvent} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Event Title <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={title}
                    className="w-full px-4 py-3 pl-10 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-base-100"
                    placeholder="Enter event title"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEdit className="text-base-content/50" />
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Description <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  defaultValue={description}
                  className="w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-base-100"
                  placeholder="Brief event description"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Location <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    required
                    defaultValue={location}
                    className="w-full px-4 py-3 pl-10 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-base-100"
                    placeholder="Event venue or address"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-base-content/50" />
                  </div>
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Event Type <span className="text-error">*</span>
                </label>
                <select
                  name="eventType"
                  required
                  defaultValue={eventType}
                  className="w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-base-100"
                >
                  <option value="">Select event type</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium text-base-content">
                  Event Thumbnail <span className="text-error">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  uploadedUrl 
                    ? 'border-success bg-success/10' 
                    : imgError 
                    ? 'border-error bg-error/10' 
                    : 'border-base-300 hover:border-primary bg-base-200'
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        uploadedUrl ? 'bg-success/20' : imgError ? 'bg-error/20' : 'bg-primary/20'
                      }`}>
                        {uploadedUrl ? (
                          <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : imgError ? (
                          <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <FaImage className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          uploadedUrl ? 'text-success' : imgError ? 'text-error' : 'text-base-content'
                        }`}>
                          {imageFile ? imageFile.name : "Click to upload new thumbnail"}
                        </p>
                        <p className="text-xs text-base-content/70 mt-1">
                          Current: {thumbnail ? "Image set" : "No image"}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {/* Upload Status */}
                <div className="mt-2">
                  {imgLoading && (
                    <div className="flex items-center space-x-2 text-primary">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">Uploading image...</span>
                    </div>
                  )}
                  {imgError && (
                    <div className="flex items-center space-x-2 text-error">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{imgError}</span>
                    </div>
                  )}
                  {uploadedUrl && !imgLoading && (
                    <div className="flex items-center space-x-2 text-success">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Image ready for update!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Creator Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Creator's Name <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="creator_name"
                    required
                    defaultValue={creator_name}
                    className="w-full px-4 py-3 pl-10 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-base-200"
                    placeholder="Your name"
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-base-content/50" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Creator's Email <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="creator_email"
                    required
                    defaultValue={creator_email}
                    className="w-full px-4 py-3 pl-10 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-base-200"
                    placeholder="Your email"
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-base-content/50" />
                  </div>
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium text-base-content">
                  Event Date <span className="text-error">*</span>
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
                  <p className="text-sm text-success mt-2">
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
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content font-medium rounded-lg hover:from-primary-focus hover:to-secondary-focus focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <FaEdit className="w-5 h-5" />
                <span>Update Event</span>
              </button>
            </div>
          </form>
        </div>

        {/* Delete Section */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-error to-pink-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-primary-content flex items-center gap-2">
              <FaTrash className="w-5 h-5" />
              Danger Zone
            </h2>
          </div>
          
          <div className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-base-content mb-4">
                Delete Your Event
              </h3>
              <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
                Once you delete an event, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => handleDeleteEvent(_id)}
                className="px-8 py-3 bg-gradient-to-r from-error to-pink-600 text-primary-content font-medium rounded-lg hover:from-error-focus hover:to-pink-700 focus:ring-4 focus:ring-error/20 focus:outline-none transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
              >
                <FaTrash className="w-5 h-5" />
                <span>Delete Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMyEvent;