export const handleLogin = async (username, password) => {
  localStorage.removeItem("authToken");

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json(); // Assuming the response contains a JSON object
    const token = data.token; // Assuming the token is in a property named 'token'

    localStorage.setItem("authToken", token);

    window.location.href = "/user/dashboard"; // Redirect to dashboard
  } catch (error) {
    throw error; // Re-throw the error to be caught in the component
  }
};
