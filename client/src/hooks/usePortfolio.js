import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchWithAuth } from '@/constants/apiEndpoints';

export const usePortfolio = (email) => {
  const [portfolioData, setPortfolioData] = useState({
    userDetails: null,
    toolNames: [],
    tools: [],
    toolComponents: [],
    education: [],
    certificates: [],
    projects: [],
    links: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.USER_DETAILS(email));
      setPortfolioData(prev => ({ ...prev, userDetails: data }));
    } catch (err) {
      setError('Failed to fetch user details');
      console.error(err);
    }
  };

  // Update user details
  const updateUserDetails = async (updatedData) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER_DETAILS(email), {
        method: 'POST', // Try to create first
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok && response.status === 404) {
        // If creation fails with 404, try updating instead
        const updateResponse = await fetch(API_ENDPOINTS.USER_DETAILS(email), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update portfolio');
        }

        const data = await updateResponse.json();
        setPortfolioData(prev => ({ ...prev, userDetails: data }));
        return data;
      }

      const data = await response.json();
      setPortfolioData(prev => ({ ...prev, userDetails: data }));
      return data;
    } catch (err) {
      console.error('Failed to update user details:', err);
      throw err;
    }
  };

  // Fetch tool names
  const fetchToolNames = async () => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.TOOL_NAMES);
      setPortfolioData(prev => ({ ...prev, toolNames: data }));
    } catch (err) {
      setError('Failed to fetch tool names');
      console.error(err);
    }
  };

  // Create tool name
  const createToolName = async (name) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.TOOL_NAMES, {
        method: 'POST',
        body: JSON.stringify({ name, user: portfolioData.userDetails.id }),
      });
      setPortfolioData(prev => ({
        ...prev,
        toolNames: [...prev.toolNames, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to create tool name');
      throw err;
    }
  };

  // Create tool
  const createTool = async (name, toolNameId) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.TOOLS, {
        method: 'POST',
        body: JSON.stringify({ name, tool_name: toolNameId }),
      });
      setPortfolioData(prev => ({
        ...prev,
        tools: [...prev.tools, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to create tool');
      throw err;
    }
  };

  // Create tool component
  const createToolComponent = async (name, toolId) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.TOOL_COMPONENTS, {
        method: 'POST',
        body: JSON.stringify({ name, tool: toolId }),
      });
      setPortfolioData(prev => ({
        ...prev,
        toolComponents: [...prev.toolComponents, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to create tool component');
      throw err;
    }
  };

  // Add education entry
  const addEducation = async (educationData) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.EDUCATION, {
        method: 'POST',
        body: JSON.stringify({
          ...educationData,
          user: portfolioData.userDetails.id,
        }),
      });
      setPortfolioData(prev => ({
        ...prev,
        education: [...prev.education, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to add education');
      throw err;
    }
  };

  // Add certificate
  const addCertificate = async (certificateData) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.CERTIFICATES, {
        method: 'POST',
        body: JSON.stringify({
          ...certificateData,
          user: portfolioData.userDetails.id,
        }),
      });
      setPortfolioData(prev => ({
        ...prev,
        certificates: [...prev.certificates, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to add certificate');
      throw err;
    }
  };

  // Add project
  const addProject = async (projectData) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.PROJECTS, {
        method: 'POST',
        body: JSON.stringify({
          ...projectData,
          user: portfolioData.userDetails.id,
        }),
      });
      setPortfolioData(prev => ({
        ...prev,
        projects: [...prev.projects, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to add project');
      throw err;
    }
  };

  // Add link to project
  const addProjectLink = async (linkData) => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.LINKS, {
        method: 'POST',
        body: JSON.stringify(linkData),
      });
      setPortfolioData(prev => ({
        ...prev,
        links: [...prev.links, data],
      }));
      return data;
    } catch (err) {
      setError('Failed to add project link');
      throw err;
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        console.log('Fetching portfolio data for email:', email);
        
        // Fetch user details first as it contains nested data
        const userDetailsData = await fetchWithAuth(API_ENDPOINTS.USER_DETAILS(email));
        console.log('Fetched user details:', userDetailsData);
        
        // Update state with all the nested data
        setPortfolioData(prev => ({
          ...prev,
          userDetails: userDetailsData,
          toolNames: userDetailsData.toolname || [],
          education: userDetailsData.education || [],
          certificates: userDetailsData.certificate || [],
          projects: userDetailsData.project || [],
        }));

      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
        setError('Failed to fetch portfolio data');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchAllData();
    }
  }, [email]);

  return {
    portfolioData,
    loading,
    error,
    updateUserDetails,
    createToolName,
    createTool,
    createToolComponent,
    addEducation,
    addCertificate,
    addProject,
    addProjectLink,
  };
}; 
