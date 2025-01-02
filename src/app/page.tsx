"use client";

import { InputForm } from "@/components";
import { DisplayModal } from "@/components/display-modal";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [numberOfRows, setNumberOfRows] = useState<number | null>(null);

  return (
    <div className="h-screen relative flex items-center justify-center">
      <InputForm
        setNumberOfRows={setNumberOfRows}
        handleModal={() => setShowModal(true)}
      />
      {showModal && numberOfRows ? (
        <DisplayModal
          numberOfRows={numberOfRows}
          handleModal={() => setShowModal(false)}
        />
      ) : null}
    </div>
  );
}
