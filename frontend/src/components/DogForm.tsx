import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDog } from "../api/dogs";
import "../styles/DogForm.css";

interface DogFormData {
  name: string;
  breed: string;
  age: number;
  photo: File | null;
}

export default function DogForm() {
  // Form state
  const [dogFormData, setDogFormData] = useState<DogFormData>({
    name: "",
    breed: "",
    age: 0,
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const addDogMutation = useMutation({
    mutationFn: addDog,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["dogs"] });
    },
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle number input change (for age)
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDogFormData((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  // Handle file input change (for photo)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDogFormData((prevState) => ({
        ...prevState,
        photo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dogFormData.name && dogFormData.breed && dogFormData.age > 0) {
      const formData = new FormData();
      formData.append("name", dogFormData.name);
      formData.append("breed", dogFormData.breed);
      formData.append("age", dogFormData.age.toString());

      if (dogFormData.photo) {
        formData.append("photo", dogFormData.photo);
      }

      addDogMutation.mutate(formData);
      setSuccessMessage("Pies został dodany!");
      setErrorMessage(null);
      setDogFormData({ name: "", breed: "", age: 0, photo: null });
      setImagePreview(null);
    } else {
      setErrorMessage("Proszę uzupełnić wszystkie pola.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Dodaj Psa</h2>

      <form onSubmit={handleSubmit}>
        {/* Imię Psa */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Imię Psa
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={dogFormData.name}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            placeholder="Imię Psa"
          />
        </div>

        {/* Rasa */}
        <div className="mb-4">
          <label htmlFor="breed" className="block text-gray-700">
            Rasa
          </label>
          <input
            id="breed"
            name="breed"
            type="text"
            value={dogFormData.breed}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            placeholder="Rasa"
          />
        </div>

        {/* Wiek */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700">
            Wiek
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={dogFormData.age}
            onChange={handleNumberChange}
            className="input input-bordered w-full mt-2"
            placeholder="Wiek"
          />
        </div>

        {/* Zdjęcie */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700">
            Zdjęcie
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            onChange={onFileChange}
            className="input input-bordered w-full mt-2"
            accept="image/*"
          />

          {/* Wyświetlanie zdjęcia po wybraniu */}
          {imagePreview && (
            <div className="flex justify-start mt-2">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Zdjęcie psa"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Przyciski */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={
              !dogFormData.name || !dogFormData.breed || dogFormData.age <= 0
            }
            className="btn btn-primary w-full py-2 mt-4"
          >
            Dodaj Psa
          </button>
        </div>
      </form>

      {/* Komunikaty */}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
    </div>
  );
}
