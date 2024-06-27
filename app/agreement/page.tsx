"use client";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { setLocalStorageAgreement } from "../utils/localStorage";

export interface IPolicyModal {
  terms: boolean;
  privacy: boolean;
}

export default function Page() {
  const [formData, setFormData] = useState({
    terms: false,
    privacy: false,
    age: false,
  });
  const [agreeAll, setAgreeAll] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onPressAgree = () => {
    if (formData.age && formData.privacy && formData.terms) {
      setLocalStorageAgreement("true");
      router.replace("/chat");
    } else {
      return alert("Need agreement");
    }
  };

  const onPressAgreeAll = () => {
    if (!agreeAll) {
      setFormData({ terms: true, privacy: true, age: true });
    } else {
      setFormData({ terms: false, privacy: false, age: false });
    }
    setAgreeAll(!agreeAll);
  };

  useEffect(() => {
    if (formData.age && formData.privacy && formData.terms) {
      setAgreeAll(true);
    } else setAgreeAll(false);
  }, [formData]);

  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex w-full h-14 border-b items-center p-4">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <IoArrowBack size={24} />
        </button>
      </div>
      <div className="p-4 pt-0 mt-8">
        <h1 className="font-bold">Agreement</h1>
        <p className="text-sm mt-4 text-secondary/80">
          In order to use our service, you must agree to the following.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPressAgree();
          }}
          className="mt-4"
        >
          <div className="flex mb-2">
            <input
              type="checkbox"
              name="agreeAll"
              id="agreeAll"
              checked={agreeAll}
              onChange={onPressAgreeAll}
            />
            <label
              htmlFor="agreeAll"
              className="ml-2 hover:text-blue font-bold"
            >
              Agree to All
            </label>
          </div>
          <hr className="my-4"></hr>

          <div className="flex">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label
              htmlFor="terms"
              onClick={() => {
                router.push("/agreement/terms");
              }}
              className="ml-2 underline-offset-4 underline hover:text-blue"
            >
              Agree to Terms Of Use*
            </label>
          </div>

          <div className="flex my-2">
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
            />
            <label
              htmlFor="id"
              onClick={() => {
                router.push("/agreement/privacy");
              }}
              className="ml-2 underline-offset-4 underline hover:text-blue"
            >
              Agree to Privacy Policy*
            </label>
          </div>

          <div className="flex">
            <input
              type="checkbox"
              name="age"
              checked={formData.age}
              onChange={handleChange}
            />
            <label htmlFor="id" className="ml-2">
              Confirm your age is 18 or older*
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue px-16 py-1 mt-8 rounded-full text-primary"
            >
              Agree
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
