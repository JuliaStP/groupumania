export const serverLogin = async (email, password) => {
  console.log("Requesting login:", email, password);
  const url = "http://localhost:3000/api/signin";
  console.log("URL:", url);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response:", response);
    const data = await response.json();
    console.log("Response data:", data);
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      return { success: true, id: data.id, token: data.token };
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};

export const serverSignup = async (email, firstName, lastName, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, firstName, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      return { success: true, id: data.id, token: data.token };
    } else {
      throw new Error(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: error.message };
  }
};

export const serverDeleteUser = async (id) => {
  console.log("API Delete User ID:", id);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.text();
      console.error("Server error:", errorData);
      throw new Error(errorData || "Delete failed");
    }
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
};

export const createPost = async (formData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogposts`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    return true;
  } catch (error) {
    console.error("API error:", error);
    return false;
  }
};
