import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientProfile from "../components/clients/ClientProfile";
import { Client } from "../types/clients";
import { clientService } from "../services/clientService";
import { MOCK_CLIENTS } from "../data/mockClients";

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // const fetchClients = async () => {
    //   try {
    //     setLoading(true);
    //     const fetchedClients = await clientService.getClients();
    //     console.log("fetchedClients", fetchedClients);
    //     setClients(fetchedClients);
    //     setError(null);
    //   } catch (err) {
    //     console.error("Error fetching clients:", err);
    //     setError("Failed to load clients. Please try again later.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchClients();
    setLoading(true);
    setClients(MOCK_CLIENTS);
    setLoading(false);
  }, []);
  const client = clients.find((c) => c.id === id);
  console.log("**********", client);
  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">{error}</div>
      </div>
    );
  }
  if (!client) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          Client not found
        </div>
      </div>
    );
  }

  return <ClientProfile client={client} onClose={() => navigate("/clients")} />;
};

export default ClientDetails;
