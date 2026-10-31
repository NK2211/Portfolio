document.addEventListener("DOMContentLoaded", () => {
  const client = window.supabaseClient || supabaseClient;
  const form = document.getElementById("authForm");
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const nameField = document.getElementById("nameField");
  const title = document.getElementById("authTitle");
  const subtitle = document.getElementById("authSubtitle");
  const submitBtn = document.getElementById("submitBtn");
  const status = document.getElementById("authStatus");
  const forgotWrap = document.getElementById("forgotWrap");
  const passwordInput = document.getElementById("password");
  let mode = "login";

  function showStatus(message, isError = false) {
    status.textContent = message;
    status.style.color = isError ? "#ff6b6b" : "var(--accent-cyan)";
  }

  function setMode(nextMode) {
    mode = nextMode;
    const signup = mode === "signup";
    loginTab.classList.toggle("active", !signup);
    signupTab.classList.toggle("active", signup);
    nameField.hidden = !signup;
    document.getElementById("fullName").required = signup;
    forgotWrap.hidden = signup;
    passwordInput.autocomplete = signup ? "new-password" : "current-password";
    title.textContent = signup ? "Create your account" : "Welcome back";
    subtitle.textContent = signup
      ? "Create an account to access visitor features."
      : "Sign in to your visitor account.";
    submitBtn.innerHTML = signup
      ? '<i class="fa-solid fa-user-plus"></i> Create account'
      : '<i class="fa-solid fa-right-to-bracket"></i> Sign in';
    showStatus("");
  }

  loginTab.addEventListener("click", () => setMode("login"));
  signupTab.addEventListener("click", () => setMode("signup"));

  if (!client || SUPABASE_URL.includes("YOUR_SUPABASE") ||
      SUPABASE_PUBLISHABLE_KEY.includes("YOUR_SUPABASE")) {
    showStatus("Add your Supabase Project URL and publishable key in supabase.js first.", true);
    form.querySelectorAll("input,button").forEach(el => el.disabled = true);
    document.getElementById("googleBtn").disabled = true;
    return;
  }

  client.auth.getSession().then(({ data, error }) => {
    if (error) showStatus(error.message, true);
    if (data.session) window.location.replace("index.html");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (mode === "update") {
      submitBtn.disabled = true;
      const { error } = await client.auth.updateUser({ password: passwordInput.value });
      submitBtn.disabled = false;
      if (error) showStatus(error.message, true);
      else {
        showStatus("Password updated. You can now sign in.");
        setTimeout(() => window.location.replace("auth.html"), 1200);
      }
      return;
    }
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;
    submitBtn.disabled = true;
    showStatus(mode === "signup" ? "Creating your account…" : "Signing you in…");

    try {
      if (mode === "signup") {
        const fullName = document.getElementById("fullName").value.trim();
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/index.html`
          }
        });
        if (error) throw error;
        if (data.session) {
          showStatus("Account created. Redirecting…");
          window.location.replace("index.html");
        } else {
          showStatus("Account created. Check your email and confirm your address before signing in.");
          form.reset();
        }
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showStatus("Signed in. Redirecting…");
        window.location.replace("index.html");
      }
    } catch (error) {
      showStatus(error.message || "Authentication failed. Please try again.", true);
    } finally {
      submitBtn.disabled = false;
    }
  });

  document.getElementById("googleBtn").addEventListener("click", async () => {
    showStatus("Redirecting to Google…");
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/index.html` }
    });
    if (error) showStatus(error.message, true);
  });

  document.getElementById("forgotPassword").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    if (!email) {
      showStatus("Enter your email address first.", true);
      document.getElementById("email").focus();
      return;
    }
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth.html?reset=true`
    });
    if (error) showStatus(error.message, true);
    else showStatus("Password reset email sent. Check your inbox.");
  });

  // Supabase redirects here after a password-reset link.
  const params = new URLSearchParams(window.location.search);
  if (params.get("reset") === "true") {
    title.textContent = "Set a new password";
    subtitle.textContent = "Enter a new password for your account.";
    submitBtn.innerHTML = '<i class="fa-solid fa-key"></i> Update password';
    mode = "update";
    title.textContent = "Set a new password";
    subtitle.textContent = "Enter a new password for your account.";
    nameField.hidden = true;
    forgotWrap.hidden = true;
    loginTab.parentElement.hidden = true;
    document.getElementById("googleBtn").hidden = true;
    document.querySelector(".auth-divider").hidden = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-key"></i> Update password';
  }
});
