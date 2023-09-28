// hooks/handlePurchase.js

const handlePurchase = async (cart) => {
  try {
    const response = await fetch("/api/createFormGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await response.json();

    if (data && data.data && data.data._id) {
      localStorage.setItem("formURL", data.data._id);
      return data.data._id; // Return the ID to use for routing
    }
  } catch (error) {
    console.error("Error creating form group", error);
  }
};

export default handlePurchase;
