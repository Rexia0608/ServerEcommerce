// validateSanitizeMiddleware.js
export default (req, res, next) => {
  // Destructure and sanitize all incoming fields
  let {
    email = '',
    fName = '',
    lName = '',
    password = '',
    confirmPassword = ''
  } = req.body;

  email = sanitizeInput(email, {
    lowerCase: true,
    normalizeWhitespace: true,
    allowOnlyEmailSafe: true
  });

  fName = sanitizeInput(fName, {
    stripHTML: true,
    normalizeWhitespace: true
  });

  lName = sanitizeInput(lName, {
    stripHTML: true,
    normalizeWhitespace: true
  });

  password = sanitizeInput(password, {
    normalizeWhitespace: true
  });

  confirmPassword = sanitizeInput(confirmPassword, {
    normalizeWhitespace: true
  });

  // Replace original values with sanitized ones
  req.body = { email, fName, lName, password, confirmPassword };

  // Handle registration validation
  if (req.method === "POST" && req.originalUrl === "/register") {
    if (![email, fName, lName, password, confirmPassword].every(Boolean)) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const nameRegex = /^[a-zA-Z]+$/;
    const nameWithSpacesRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if (!nameWithSpacesRegex.test(fName) || !nameWithSpacesRegex.test(lName) || fName.split(' ').filter(Boolean).length > 3 || lName.split(' ').filter(Boolean).length > 3) {
      return res.status(400).json({ error: "Names must contain only letters (no special characters)" });
    }

    if (!validEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
  }

  // Handle login validation
  else if (req.method === "POST" && req.originalUrl === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    if (!validEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  next();
};

// Validate email format
function validEmail(userEmail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(userEmail);
}

// Sanitize input helper
function sanitizeInput(input, options = {}) {
  const {
    escapeHTML = true,
    stripHTML = false,
    normalizeWhitespace = true,
    lowerCase = false,
    allowOnlyEmailSafe = false
  } = options;

  let output = String(input || '');

  if (normalizeWhitespace) {
    output = output.trim().replace(/\s+/g, ' ');
  }

  if (lowerCase) {
    output = output.toLowerCase();
  }

  if (stripHTML) {
    output = output.replace(/<\/?[^>]+(>|$)/g, '');
  }

  if (escapeHTML && !stripHTML) {
    output = output
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (allowOnlyEmailSafe) {
    output = output.replace(/[^a-zA-Z0-9@._-]/g, '');
  }

  return output;
}
