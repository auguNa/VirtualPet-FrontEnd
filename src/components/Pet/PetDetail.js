import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PetDetail = () => {
  console.log("Rendering PetDetail component");
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Fetched pet data:", response.data);
        setPet(response.data);
        console.log("Pet state set:", response.data);
        setName(response.data.name);
        setColor(response.data.color);
        setType(response.data.type);
      } catch (error) {
        console.error("Error fetching pet details", error);
      }
    };

    fetchPet();
  }, [id, authToken]);

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.put(
        `http://localhost:8080/api/pets/${id}`,
        { name, color, type },  // Include 'type' if it's supposed to be updated
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSuccess("Pet updated successfully!");
      navigate("/user"); // Redirect back to user page after update
    } catch (error) {
      setError("Error updating pet");
      console.error("Error updating pet", error);
    }
  };

  if (!pet) {
    return <div>Loading...</div>;
  }
  console.warn("Pet data to be rendered:", pet);

  return (
    <div className="container">
      <h2>Edit Pet</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleUpdatePet}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Pet</button>
      </form>
    </div>
  );
};

export default PetDetail;