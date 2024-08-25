import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const DualImageUploadForm: React.FC = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [imageUrl1, setImageUrl1] = useState<string>("");
  const [imageUrl2, setImageUrl2] = useState<string>("");

  const handleFileChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile1(e.target.files[0]);
    }
  };

  const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile2(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upload the first image
    if (file1) {
      const formData1 = new FormData();
      formData1.append("file", file1);
      formData1.append("upload_preset", "ely5euov"); // Replace with your Cloudinary upload preset

      try {
        const response1 = await axios.post<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/demwmhvsc/image/upload`,
          formData1
        );
        setImageUrl1(response1.data.secure_url); // Store the first image URL
        console.log(
          "First image uploaded successfully:",
          response1.data.secure_url
        );
      } catch (error) {
        console.error("Error uploading the first image", error);
      }
    }

    // Upload the second image
    if (file2) {
      const formData2 = new FormData();
      formData2.append("file", file2);
      formData2.append("upload_preset", "ely5euov"); // Replace with your Cloudinary upload preset

      try {
        const response2 = await axios.post<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
          formData2
        );
        setImageUrl2(response2.data.secure_url); // Store the second image URL
        console.log(
          "Second image uploaded successfully:",
          response2.data.secure_url
        );
      } catch (error) {
        console.error("Error uploading the second image", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Image 1:</label>
          <input type="file" onChange={handleFileChange1} />
        </div>
        <div>
          <label>Upload Image 2:</label>
          <input type="file" onChange={handleFileChange2} />
        </div>
        <Button type="submit">Upload Images</Button>
      </form>

      <div>
        {imageUrl1 && (
          <div>
            <h3>First Image:</h3>
            <img
              src={imageUrl1}
              alt="First Upload"
              style={{ width: "200px", margin: "10px" }}
            />
          </div>
        )}
        {imageUrl2 && (
          <div>
            <h3>Second Image:</h3>
            <img
              src={imageUrl2}
              alt="Second Upload"
              style={{ width: "200px", margin: "10px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DualImageUploadForm;
