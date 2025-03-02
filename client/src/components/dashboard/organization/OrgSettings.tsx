import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrgSettings() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    industry: "",
    founded_at: "",
    contact_phone: "",
    logo: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);

  // Fetch existing company data when component mounts
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('authToken');

    if (!token) {
     
      console.log("no token")
      return;
    }
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            "Authorization": token,
            'Content-Type': "application/json",
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          setError('Please login to access this page');
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("Fetched user data:", userData);

        const company = userData.companies?.[0];
        if (company) {
          console.log("Found company data:", company);
          setCompanyId(company.id);
          setFormData({
            name: company.name || "",
            description: company.description || "",
            website: company.website || "",
            location: company.location || "",
            industry: company.industry || "",
            founded_at: company.founded_at || "",
            contact_phone: company.contact_phone || "",
            logo: null
          });
        } else {
          setError('No company data found');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('Failed to load company data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        logo: e.target.files![0]
      }));
    }
  };

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log("no token");
        return;
      }

      // Create the request body as a regular object
      const requestData = {
        name: formData.name,
        description: formData.description,
        website: formData.website,
        location: formData.location,
        industry: formData.industry,
        founded_at: formData.founded_at,
        contact_phone: formData.contact_phone
      };

      // Send PATCH request to update company data
      const response = await fetch(`http://localhost:8000/api/companies/${companyId}/`, {
        method: 'PATCH',
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });

      if (response.status === 401) {
        alert('Please login to update settings');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Settings updated:', result);
      alert('Organization settings updated successfully!');

      // If there's a logo to upload, do it in a separate request
      if (formData.logo) {
        const logoData = new FormData();
        logoData.append('logo', formData.logo);

        const logoResponse = await fetch(`http://localhost:8000/api/companies/${companyId}/`, {
          method: 'PATCH',
          headers: {
            "Authorization": token,
          },
          credentials: 'include',
          body: logoData
        });

        if (!logoResponse.ok) {
          console.error('Error uploading logo:', await logoResponse.text());
        }
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Logo Preview */}
      {formData.logo && (
        <div className="mb-4">
          <label className="block text-sm text-neutral-accent mb-2">Current Logo</label>
          <img 
            src={URL.createObjectURL(formData.logo)} 
            alt="Company Logo Preview" 
            className="h-20 w-20 object-cover rounded-lg border border-glass-border"
          />
        </div>
      )}

      <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-neutral-text mb-6">Organization Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Company Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Website *</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter website URL"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter company location"
                required
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Industry *</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter industry type"
                required
              />
            </div>

            {/* Founded Date */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Founded Date *</label>
              <input
                type="date"
                name="founded_at"
                value={formData.founded_at}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Contact Phone *</label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter contact phone"
                required
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Description - Full Width */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm text-neutral-accent mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                rows={4}
                placeholder="Enter company description"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-4 py-2 rounded-lg overflow-hidden"
          onClick={handleSaveSettings}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-white/10 to-cyan-500/20 group-hover:opacity-100 opacity-50 transition-opacity" />
          <div className="relative bg-neutral-glass border border-glass-border px-4 py-2 rounded-lg text-neutral-text group-hover:text-white transition-colors">
            Save Changes
          </div>
        </motion.button>
      </div>
    </div>
  );
} 